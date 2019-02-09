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
          >editar</button>
        </div>
        <div class="col-2">
          <button
            type="button"
            class="btn btn-danger"
            style="margin:4px;padding:10px"
            v-show="owner"
            @click="delet"
          >borrar</button>
        </div>
        <div class="col-2">
          <button
            type="button"
            class="btn btn-danger"
            style="margin:4px;padding:10px"
            @click="viewDetails"
          >Ver detalles</button>
        </div>
      </div>
      <div v-if="viewAnswer" class="col-12">holasasda
        <div
          style="margin:30px 0 0 0;"
          v-for="item in items"
          :key="item._id"
          @edit="edit"
          @delet="delet"
        >
          <p>Answer: {{item.text}}</p>
          <p>author: {{item.author}}</p>
          <p>created At: {{item.createdAt}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
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
      items: [],
      viewAnswer: false
    };
  },
  methods: {
    load() {
      fetch(
        "http://10.20.9.25:3000/api/v1/" +
          "answers/" +
          this.questionId +
          "/answers"
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { items = [] } = data;
          const answers = items.map(item => {
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
      this.$emit("delet", {
        questionId: this.questionId
      });
    },
    viewDetails: function() {
      this.viewAnswer = !this.viewAnswer;
      this.load();
    }
  }
};
</script>
