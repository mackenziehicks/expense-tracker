<template>
  <div id="expenseTracker">
    <button type="button" class="btn-green" @click="showModal = true">
       Submit expense
    </button>
    <div v-if='expenses.length > 0'>
      <div class='column-left content'>
        <table>
          <tr>
            <th>Description</th>
            <th>Cost</th>
            <th>Quantity</th>
          </tr>
          <tr v-for='expense in expenses' :key='expense'>
            <td>{{ expense.description }}</td>
            <td>{{ expense.cost | currency }}</td>
            <td>{{ expense.quantity }}</td>
          </tr>
        </table>
      </div>
      <div class='column-right content'>
        <p>Running total:</p>
        <p>{{ runningTotal | currency }}</p>
      </div>
    </div>
    <div v-show='showModal'>
      <div class="modal-backdrop">
         <div class="modal">
           <header class="modal-header">
              <button
                type="button"
                class="btn-close"
                @click="closeModal"
              >
                x
              </button>
            </header>
            <div class="modal-body">
              <form name='form' @submit.stop.prevent='handleSubmit'>
                <div class='form-content'>
                  <div class='form-group'>
                    <label for='description'>Description</label>
                    <input id='description' type='text' v-model='expense.description' required>
                  </div>
                  <div class='form-group'>
                    <label for='cost'>Cost</label>
                    <input id='cost' type='number' min='0.01' step='0.01' v-model='expense.cost' required>
                  </div>
                  <div class='form-group'>
                      <label for='quantity'>Quantity</label>
                    <input id='quantity' type='number' v-model='expense.quantity' required>
                  </div>
                  <div>
                    <label for='total'>Total</label>
                    <p id='total'>{{ expenseTotal | currency }}</p>
                  </div>
                </div>
                <button type="submit" class="btn-green">
                  Submit
                </button>
              </form>
            </div>
         </div>
       </div>
     </div>
  </div> 
</template>

<script>
  export default {
    name: 'expenseTracker',
    data() {
      return {
        showModal: false, 
        expense: {
          description: null, 
          cost: null,
          quantity: null, 
        },
        expenses: [],
        runningTotal: 0,
      }
    },
    methods: {
      closeModal() {
        this.showModal = false;
        this.resetModal();
      },
      resetModal() {
        this.expense = {
          description: null, 
          cost: null,
          quantity: null
        }
      }, 
      handleSubmit() {
        this.expenses.push(this.expense);
        this.runningTotal += this.expenseTotal;
        this.closeModal();
      }
    },
    computed: {
      expenseTotal() {
        return this.expense.cost * this.expense.quantity;
      }
    }
  }
</script>

<style>
  #expenseTracker {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    margin: 60px;
  }

  .content {
    margin-top: 50px;
  }

  .column-left {
    float: left;
    width: 80%;
  }

  .column-right {
    float: right;
    margin-right: auto;
    width: 20%;
  }

  table {
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 30px;
    width: 75%;
  }

   .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    padding-left: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    width: 300px;
  }

  .form-group {
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 20px;
  }

  input {
    height: 25px;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
  }

  .btn-green {
    color: white;
    font-size: 17px;
    background: #4AAE9B;
    border: none;
    border-radius: 2px;
  }
</style>
