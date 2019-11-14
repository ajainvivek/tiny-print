<template>
  <div id="app">
    <div id="print" class="invoice-box">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="4">
            <table>
              <tr>
                <td class="title">
                  <img src="https://webxp.io/static/img/logo.png" style="height: 60px;">
                </td>

                <td>
                  Invoice #: 123<br> Created: January 1, 2015<br> Due: February 1, 2015
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="information">
          <td colspan="4">
            <table>
              <tr>
                <td>
                  WebXP, Inc.<br> 12345 Sunny Road<br> Sunnyville, CA 12345
                </td>

                <td>
                  Acme Corp.<br> John Doe<br> john@example.com
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="heading">
          <td colspan="3">Payment Method</td>
          <td>Check #</td>
        </tr>

        <tr class="details">
          <td colspan="3">Check</td>
          <td>1000</td>
        </tr>

        <tr class="heading">
          <td>Item</td>
          <td>Unit Cost</td>
          <td>Quantity</td>
          <td>Price</td>
        </tr>

        <tr class="item" v-for="item in items">
          <td><input v-model="item.description" /></td>
          <td>$<input type="number" v-model="item.price" /></td>
          <td><input type="number" v-model="item.quantity" /></td>
          <td>${{ item.price * item.quantity | currency }}</td>
        </tr>

        <tr>
          <td colspan="4">
            <button class="btn-add-row" @click="addRow">Add Row</button>
            <button class="btn-add-row" @click="handlePrint">Print Invoice</button>
          </td>
        </tr>

        <tr class="total">
          <td colspan="3"></td>
          <td>Total: ${{ total | currency }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import tinyPrint from 'tiny-print';

export default {
  name: 'app',
  components: {},
  data () {
    return {
      items: [
        { description: "Website design", quantity: 1, price: 300 },
        { description: "Website design", quantity: 1, price: 75 },
        { description: "Website design", quantity: 1, price: 10 }
      ]
    }
  },
  computed: {
    total() {
      return this.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    }
  },
  methods: {
    addRow() {
      this.items.push({ description: "", quantity: 1, price: 0 });
    },
    handlePrint() {
      const invoiceEl = this.$el.querySelector('#print')
      tinyPrint(invoiceEl, {
        scanStyles: true,
        importStyles: false,
        hidePageRule: false,
        cssStyle: ''
      })
    }
  },
  filters: {
    currency(value) {
      return value.toFixed(2);
    }
  }
}
</script>

<style>
input {
    border: 1px solid #eee;
    padding: 15px;
    background: rgba(255,255,255,0.5);
    margin: 0 0 10px 0;
}

.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(n + 2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.item input {
  padding-left: 5px;
}

.invoice-box table tr.item td:first-child input {
  margin-left: -5px;
  width: 100%;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type="number"] {
  width: 60px;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}

</style>
