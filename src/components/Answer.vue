<template>
  <div class="post__container">
    <div class="card">
      <div class="card-body row">
        <div class="col-6">
          <h5 class="card-title">Answer: {{text}}</h5>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "answer",
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
    answerId: {
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
      viewAnswer: false,
      answerId: "",
      answerUpdate: {
        answerId: "",
        text: "",
        authorId: localStorage.getItem("_userId")
      }
    };
  },
  methods: {
    edit() {
      this.$emit("editAnswer", {
        answerId: this.answerId,
        text: this.text,
        author: this.author,
        authorId: this.authorId,
        owner: this.owner,
        createdAt: this.createdAt
      });
    },
    delet() {
      this.$emit("deletAnswer", {
        answerId: this.answerId
      });
    }
  }
};
</script>
