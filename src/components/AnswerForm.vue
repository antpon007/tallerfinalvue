<template>
  <form>
    <h4>Answer:</h4>
    <div class="form-group">
      <textarea class="form-control" rows="3" v-model="_text"></textarea>
    </div>
    <button type="button" class="btn btn-primary" @click="save">{{option}}</button>
    <button type="button" class="btn btn-light" v-show="optionEdit" @click="clear">Cancel</button>
  </form>
</template>

<script>
export default {
  name: "answer-form",
  props: {
    answerUpdate: {
      question: "",
      answerId: "",
      text: "",
      user: localStorage.getItem("_userId")
    }
  },
  data() {
    return {
      users: [],
      optionEdit: false
    };
  },
  methods: {
    save() {
      this.$emit("save", {
        text: this._text,
        user: localStorage.getItem("_userId"),
        question: this.answerUpdate.question,
        token: localStorage.getItem("token")
      });
      this.clear();
    },
    clear() {
      this.answerUpdate.answerId = "";
      this.answerUpdate.text = "";
    }
  },
  computed: {
    option() {
      if (this.answerUpdate.answerId == "") {
        this.optionEdit = false;
      } else {
        this.optionEdit = true;
      }
      if (this.optionEdit) {
        return "Update";
      } else {
        return "Save";
      }
    },
    _id: {
      //get
      get: function() {
        return this.answerUpdate.answerId;
      },
      // setter
      set: function(newValue) {
        this.answerUpdate.answerId = newValue;
      }
    },
    _text: {
      //get
      get: function() {
        return this.answerUpdate.text;
      },
      // setter
      set: function(newValue) {
        this.answerUpdate.text = newValue;
      }
    }
  }
};
</script>
