<template>
  <form>
    <h3>FORMULA TU PREGUNTA</h3>
    <div class="form-group">
      <input type="text" class="form-control" rows="3" v-model="_id" readonly hidden>
    </div>
    <div class="form-group">
      <textarea class="form-control" rows="3" v-model="_text"></textarea>
    </div>
    <button type="button" class="btn btn-primary" @click="save">{{option}}</button>
    <button type="button" class="btn btn-light" v-show="optionEdit" @click="clear">Cancel</button>
  </form>
</template>

<script>
export default {
  name: "question-form",
  props: {
    questionUpdate: {
      questionId: "",
      text: "",
      authorId: ""
    }
  },
  data() {
    return {
      users: [],
      optionEdit: false
    };
  },
  created() {},
  methods: {
    save() {
      if (this.optionEdit) {
        this.update();
      } else {
        this.$emit("save", {
          text: this.text,
          userId: this._userId
        });
      }
      this.clear();
    },
    clear() {
      this.questionUpdate.questionId = "";
      this.questionUpdate.text = "";
      this.questionUpdate.authorId = "";
      this.questionUpdate.userId = "";
    },
    update() {
      this.$emit("update", {
        id: this._id,
        text: this._text,
        userId: this._userId
      });
    }
  },
  computed: {
    option() {
      if (this.questionUpdate.questionId == "") {
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
        return this.questionUpdate.questionId;
      },
      // setter
      set: function(newValue) {
        this.questionUpdate.questionId = newValue;
      }
    },
    _text: {
      //get
      get: function() {
        return this.questionUpdate.text;
      },
      // setter
      set: function(newValue) {
        this.questionUpdate.text = newValue;
      }
    },
    _userId: {
      //get
      get: function() {
        return this.questionUpdate.authorId;
      },
      // setter
      set: function(newValue) {
        this.questionUpdate.authorId = newValue;
      }
    }
  }
};
</script>
