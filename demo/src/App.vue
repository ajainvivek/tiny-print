<template>
  <el-container id="app">
    <el-container>
      <el-header class="header">
        <h3>Tiny Print: ~= 1kb</h3>
        <div class="menu">
          <a href="https://github.com/ajainvivek/tiny-print" target="_blank">
            <el-button>Github</el-button>
          </a>
        </div>  
      </el-header>
      
      <el-main>
          <div>
            <Invoice id="print-1" />
            <div class="button-print1-wrapper">
              <div class="example">
                <el-button type="primary" class="button" @click="() => {
                  handlePrint({});
                }">Scan Computed Styles</el-button>
                <div class="code-block">
                  <pre v-highlightjs="sourcecode">
                    <code class="javascript">
// Recommended: only for static styles
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
                    scanStyles: false,
                    scanHTML: true
                  });
                }">Scan HTML Styles</el-button>
                <div class="code-block">
                  <pre v-highlightjs="sourcecode">
                    <code class="javascript">
// Scan HTML and import styles
import tinyPrint from "tiny-print";

tinyPrint(element, {
  scanStyles: false,
  scanHTML: true
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
// Hide print page rule like title etc
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
                    scanStyles: false,
                    scanHTML: false,
                    importStyles: ['https://unpkg.com/purecss@1.0.1/build/pure-min.css']
                  });
                }">Import External Styles</el-button>
                <div class="code-block">
                  <pre v-highlightjs="sourcecode">
                    <code class="javascript">
import tinyPrint from "tiny-print";

tinyPrint(element, {
  scanStyles: false,
  scanHTML: false,
  importStyles: ['https://unpkg.com/purecss@1.0.1/build/pure-min.css']
});
                    </code>
                  </pre>
                </div>
               </div>
               <div class="example">
                <el-button type="primary" class="button" @click="() => {
                  handlePrint({
                    scanStyles: false,
                    scanHTML: true,
                    cssStyle: `
                      .invoice-box table tr.item td {
                        border-bottom: 1px solid blue !important;
                      }
                    `
                  });
                }">Custom CSS Styles</el-button>
                <div class="code-block">
                  <pre v-highlightjs="sourcecode">
                    <code class="javascript">
import tinyPrint from "tiny-print";

tinyPrint(element, {
  scanStyles: false,
  scanHTML: true,
  cssStyle: `
    .invoice-box table tr.item td {
      border-bottom: 1px solid blue !important;
    }
  `
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

.header h3 {
  display: inline-block;
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
