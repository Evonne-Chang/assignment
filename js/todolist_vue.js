// component
Vue.component('togglebutton', {

    props: ['label', 'name'],
    template:
        `<div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
            <label v-bind:for="name">
            <span class="togglebutton-label">{{ label }}</span>
            <span class="tooglebutton-box"></span>
            </label>
            <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle">
        </div>`,

    model: {
        prop: 'checked',
        event: 'change'
    },
    data: function () {
        return {
            isactive: false
        }
    },
    methods: {
        onToogle: function () {
            this.$emit('clicked', this.isactive)
        }


    }
});


var todolist = new Vue({
    el: '#app',
    data: {
        newitem: '',
        sortByStatus: false,
        todo: [],
    },
    methods: {
        addItem: function () {
            this.todo.push({ id: Math.floor(Math.random() * 9999) + 10, label: this.newitem, done: false });
            this.newitem = '';
        },
        DoneOrUndone: function (item) {
            item.done = !item.done;
        },
        deleteItem: function (item) {
            let index = this.todo.indexOf(item)
            this.todo.splice(index, 1);
        },
        clickontoogle: function (active) {
            this.sortByStatus = active;
        },

        toggleTodo: function (todo) {
            todo.complete = !todo.complete;
        },

        //顯示全部
        showAll: function () {
            this.todo.forEach(item => {
                item.show = true;
            });
        },
        //顯示完成
        showDone: function () {
            this.todo.forEach(item => {
                item.show = true;
                if (item.compeleted == false) {
                    item.show = false;
                };
            });
        },
        //顯示正在做
        showDoing: function () {
            this.todo.forEach(item => {
                item.show = true;
                if (item.compeleted == true) {
                    item.show = false;
                };
            });
        },

    },
    computed: {
        todoByStatus: function () {

            if (!this.sortByStatus) {
                return this.todo;
            }

            var sortedArray = []
            var doneArray = this.todo.filter(function (item) { return item.done; });
            var notDoneArray = this.todo.filter(function (item) { return !item.done; });

            sortedArray = [...notDoneArray, ...doneArray];
            return sortedArray;
        },

    }
});

// var STORAGE_KEY = 'vue-js-todo-P7oZi9sL'
// var todoStorage = {
//     fetch: function () {
//         var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
//         return todos;
//     },
//     save: function (todos) {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
//         // console.log('item saved');
//     }
// }





// var app = new Vue({
//     el: '#app',
//     data: {
//         newitem: '',
//         todo: todoStorage.fetch(),
//         visibility: 'all'
//     },
//     watch: {
//         todo: {
//             handler: function (todo) {
//                 todoStorage.save(todo);
//             }
//         }
//     },
//     computed: {
//         filteredTodos: function () {
//             return filters[this.visibility](this.todos);
//         }
//     },
//     methods: {
//         addTodo: function (e) {
//             e.preventDefault();
//             if (this.newitem) {
//                 this.todo.push({
//                     text: this.newitem,
//                     complete: false
//                 });
//             }
//             this.newitem = '';
//         },
//         toggleTodo: function (todo) {
//             todo.complete = !todo.complete;
//         },
//         filterTodos: function (filter) {
//             this.visibility = filter;
//         },
//         deleteTodo: function (index) {
//             this.todo.splice(index, 1);
//         }
//     }
// });