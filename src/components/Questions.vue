<template>
  <div id="app">
    <div class="container col-12">
      <div class="row">
        <div class="col-8">
          <div v-if="loading">
            <p>Loading</p>
          </div>
          <div v-else class="col-12">
            <question
              style="margin:4px;"
              v-for="item in even(items)"
              :key="item._id"
              :text="item.text"
              :author="item.author"
              :createdAt="item.createdAt"
              :authorId="item.authorId"
              :owner="owner(item.authorId,authorActual)"
              :questionId="item.questionId"
              @edit="edit"
              @delet="delet"
            ></question>
          </div>
        </div>
        <div class="col-4">
          <question-form
            :questionUpdate="replaceEdit(questionUpdate)"
            :questionId="questionId"
            @save="create"
            @update="update"
          ></question-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "./Question";
import QuestionForm from "./QuestionForm";

export default {
  name: "questions",
  components: {
    question: Question,
    "question-form": QuestionForm
  },
  data() {
    return {
      loading: true,
      items: [],
      authorActual: "",
      questionId: "",
      questionUpdate: {
        questionId: "",
        text: "",
        authorId: ""
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      fetch("http://10.20.9.25:3000/api/v1/" + "questions")
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { items = [] } = data;
          const questions = items.map(item => {
            const { user = {} } = item;
            const { firstname = "Anonimo", lastname = "", _id = "" } = user;
            return {
              text: item.text,
              author: `${firstname} ${lastname}`,
              authorId: _id,
              questionId: item._id,
              createdAt: item.createdAt
            };
          });
          this.items = questions;
          this.loading = false;
        });
    },
    create(questions) {
      fetch(this.$parent.servidor + "questions", {
        method: "POST",
        body: JSON.stringify(questions),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert("question save");
          this.load();
        });
    },
    update(questions) {
      fetch(this.$parent.servidor + "questions/" + questions.id, {
        method: "PUT",
        body: JSON.stringify(questions),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert("Save changes");
          this.load();
        });
    },
    edit(questions) {
      this.questionUpdate = {
        questionId: questions.questionId,
        authorId: questions.authorId,
        description: questions.description,
        finished: questions.finished,
        createdAt: questions.createdAt
      };
    },
    delet(questions) {
      fetch(this.$parent.servidor + "questions/" + questions.questionId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          var index = this.items.indexOf(data);
          alert("Question deleted");
          this.load();
        });
    },
    even: function(items) {
      // Set slice() to avoid to generate an infinite loop!
      return items.slice().sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
    replaceEdit: function(questionsUpdate) {
      return questionsUpdate;
    },
    owner: function(authorID, authorActual) {
      if (authorID == authorActual) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
