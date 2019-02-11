<template>
  <div class="post__container">
    <div class="card">
      <div class="card-body row">
        <div class="col-6">
          <h5 class="card-title">Question: {{text}}</h5>
          <p class="card-text">Author: {{author}}</p>
          <p>created At: {{createdAt}}</p>
        </div>
        <div class="col-2">
          <button
            type="button"
            class="btn btn-primary"
            style="margin:4px;padding:10px;"
            v-show="owner"
            @click="edit"
          >Edit</button>
        </div>
        <div class="col-2">
          <button
            type="button"
            class="btn btn-danger"
            style="margin:4px;padding:10px"
            v-show="owner"
            @click="delet"
          >Delete</button>
        </div>
        <div class="col-2">
          <button
            type="button"
            class="btn btn-danger"
            style="margin:4px;padding:10px"
            @click="viewDetails"
          >Answers</button>
        </div>
      </div>
      <div v-if="viewAnswer" class="col-12">
        <div v-if="loading">
          <p>Loading</p>
        </div>
        <div v-else class="col-12">
          <div class="row" style="margin:0 50px;padding:0;">
            <div class="col-12" style="margin:0;" v-for="item in even(items)" :key="item._id">
              <p>Answer: {{item.text}}</p>
              <p>author: {{item.author}}</p>
              <p>created At: {{item.createdAt}}</p>
              <hr>
            </div>
          </div>
          <div
            class="col-11"
            v-show="this.$parent.$parent.$parent.authenticated"
            style="margin:0 50px;padding:0;"
          >
            <answer-form
              class="col-11"
              :answerUpdate="replaceEditAnswer(answerUpdate)"
              :answerId="answerId"
              @save="createAnswer"
            ></answer-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerForm from "./AnswerForm";
export default {
  name: "question",
  components: {
    "answer-form": AnswerForm
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      required: true
    },
    authorId: {
      type: String,
      required: true
    },
    questionId: {
      type: String,
      required: true
    },
    owner: {
      type: Boolean,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      items: [],
      viewAnswer: false,
      answerId: "",
      answerUpdate: {
        question: this.questionId,
        answerId: "",
        text: "",
        user: localStorage.getItem("_userId")
      }
    };
  },
  methods: {
    load() {
      this.loading = true;
      this.items = [];
      fetch(
        process.env.VUE_APP_ROOT_API +
          "answers/" +
          this.answerUpdate.question +
          "/answers"
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { item = [] } = data;
          const answers = item.map(item => {
            const { user = {} } = item;
            const { firstname = "Anonimo", lastname = "", _id = "" } = user;
            return {
              text: item.text,
              author: `${firstname} ${lastname}`,
              authorId: _id,
              answerId: item._id,
              createdAt: item.createdAt
            };
          });
          this.items = answers;
          this.loading = false;
        });
    },
    edit() {
      this.$emit("edit", {
        questionId: this.questionId,
        text: this.text,
        author: this.author,
        authorId: this.authorId,
        owner: this.owner,
        createdAt: this.createdAt
      });
    },
    delet() {
      console.log(this.questionId);
      this.$emit("delet", {
        questionId: this.questionId
      });
    },
    createAnswer(answers) {
      console.log(answers);
      fetch(process.env.VUE_APP_ROOT_API + "answers", {
        method: "POST",
        body: JSON.stringify(answers),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert("answer save");
          this.load();
        });
    },
    replaceEditAnswer: function(answersUpdate) {
      return answersUpdate;
    },
    even: function(items) {
      // Set slice() to avoid to generate an infinite loop!
      return items.slice().sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      this.load();
    },
    viewDetails: function() {
      console.log(this.questionId);
      this.viewAnswer = !this.viewAnswer;
      this.load();
    }
  }
};
</script>
