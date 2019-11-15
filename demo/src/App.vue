<template>
  <el-container id="app">
    <el-container>
      <el-header class="header">
        <div class="menu">
          <span>Tiny Print</span>
          <el-button>Github</el-button>
        </div>  
      </el-header>
      
      <el-main>
          <div>
            <Invoice id="print-1" />
            <div class="button-print1-wrapper">
              <div class="example">
                <el-button type="primary" class="button" @click="() => {
                  handlePrint({});
                }">Scanned Styles</el-button>
                <div class="code-block">
                  <pre v-highlightjs="sourcecode">
                    <code class="javascript">
import tinyPrint from "tiny-print";

tinyPrint(element, {
  scanStyles: true
});
                    </code>
                  </pre>
                </div>
               </div>
              <div class="example">
                <el-button type="primary" class="button" @click="() => {
                  handlePrint({
                    hidePageRule: true
                  });
                }">Hide Page Rule</el-button>
                <div class="code-block">
                  <pre v-highlightjs="sourcecode">
                    <code class="javascript">
import tinyPrint from "tiny-print";

tinyPrint(element, {
  hidePageRule: true
});
                    </code>
                  </pre>
                </div>
               </div>
              <div class="example">
                <el-button type="primary" class="button" @click="() => {
                  handlePrint({
                    hidePageRule: true,
                    importStyles: ['https://unpkg.com/purecss@1.0.1/build/pure-min.css']
                  });
                }">Import External Styles</el-button>
                <div class="code-block">
                  <pre v-highlightjs="sourcecode">
                    <code class="javascript">
import tinyPrint from "tiny-print";

tinyPrint(element, {
  hidePageRule: true,
  importStyles: ['https://unpkg.com/purecss@1.0.1/build/pure-min.css']
});
                    </code>
                  </pre>
                </div>
               </div>
            </div>  
          </div>
             
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import tinyPrint from 'tiny-print';
import Invoice from './components/Invoice';

export default {
  name: 'app',
  components: {
    Invoice
  },
  methods: {
    handlePrint(options) {
      const invoiceEl = this.$el.querySelector('#print-1')
      tinyPrint(invoiceEl, options)
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
html, body, #app {
  height: 100%;
  width: 100%;
}

.header {
  background: #eee;
  height: 60px;
}

.menu {
  float: right;
  padding: 8px;
}

.menu span {
  font-size: 16px;
  padding-right: 10px;
}

.button-print1-wrapper {
  margin: 20px;
  display: table;
}

.example {
  width: 300px;
  margin: 5px;
  float: left;
}
</style>
