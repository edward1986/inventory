(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Product/check-in.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Product/check-in.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "check-in",
  props: ['product'],
  data: function data() {
    return {
      quantity: 0,
      checkType: 0,
      isCheck: false,
      purchase_order: '',
      expire_date: ''
    };
  },
  methods: {
    check: function check(type) {
      var vm = this;

      if (type === 0) {
        var requested = parseInt(vm.quantity);
        var lastTransaction;
        axios.get("/api/transaction/filter/".concat(vm.product.id)).then(function (response) {
          lastTransaction = response.data;
          return lastTransaction;
        }).then(function () {
          while (requested) {
            var quantity = lastTransaction.quantity;

            if (quantity >= requested) {
              axios.post('/api/transactions', {
                product_id: vm.product.id,
                type: type,
                display_quantity: requested,
                quantity: requested,
                purchase_order: lastTransaction.purchase_order,
                expiry_date: lastTransaction.expiry_date
              }).then(function (response) {
                vm.$emit('new-value', response.data);
              });
              requested = 0;
            } else if (requested >= quantity) {
              lastTransaction.quantity = 0;
              axios.post('/api/transactions', {
                product_id: vm.product.id,
                type: type,
                display_quantity: quantity,
                quantity: quantity,
                purchase_order: lastTransaction.purchase_order,
                expire_date: lastTransaction.expire_date
              }).then(function (response) {
                vm.$emit('new-value', response.data);
              });
              requested = requested - quantity;
            }
          }
        });
      } else if (type === 1) {
        axios.post('/api/transactions', {
          purchase_order: vm.purchase_order,
          product_id: vm.product.id,
          type: type,
          display_quantity: vm.quantity,
          quantity: vm.quantity,
          expiry_date: vm.expire_date
        }).then(function (response) {
          vm.$emit('new-value', response.data);
        });
      }

      vm.quantity = 0;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Product/index.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Product/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _check_in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check-in */ "./resources/js/components/Product/check-in.vue");
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "index_product",
  components: {
    'check-in': _check_in__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      list: []
    };
  },
  mounted: function mounted() {
    var vm = this;
    axios.get('/api/products').then(function (response) {
      vm.list = response.data.data;
    });
  },
  methods: {
    checkOperation: function checkOperation(index, event) {
      var vm = this;
      vm.list[index].transactions.push(event);
    }
  },
  computed: {
    products: function products() {
      var vm = this;
      return _.map(vm.list, function (product) {
        var transactions = _.filter(product.transactions, function (transaction) {
          return new Date(transaction.expiry_date).getTime() >= new Date().getTime();
        });

        product.quantity = _.reduce(transactions, function (sum, transaction) {
          return transaction.type == 1 ? sum + _.toInteger(transaction.display_quantity) : sum - _.toInteger(transaction.display_quantity);
        }, 0);
        return product;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Product/check-in.vue?vue&type=template&id=f7161ad6&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Product/check-in.vue?vue&type=template&id=f7161ad6&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      !_vm.isCheck
        ? _c(
            "button",
            {
              on: {
                click: function($event) {
                  _vm.checkType = 1
                  _vm.isCheck = !_vm.isCheck
                }
              }
            },
            [_vm._v("check in")]
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.isCheck
        ? _c(
            "button",
            {
              on: {
                click: function($event) {
                  _vm.checkType = 0
                  _vm.isCheck = !_vm.isCheck
                }
              }
            },
            [_vm._v("check out")]
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.isCheck
        ? _c(
            "router-link",
            {
              attrs: {
                to: { name: "show_product", params: { id: _vm.product.id } }
              }
            },
            [_vm._v("view")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.isCheck
        ? _c("div", [
            _vm.checkType == 1
              ? _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.purchase_order,
                      expression: "purchase_order"
                    }
                  ],
                  attrs: { type: "text", placeholder: "purchase number" },
                  domProps: { value: _vm.purchase_order },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.purchase_order = $event.target.value
                    }
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.quantity,
                  expression: "quantity"
                }
              ],
              attrs: { type: "number" },
              domProps: { value: _vm.quantity },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.quantity = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _vm.checkType == 1
              ? _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.expire_date,
                      expression: "expire_date"
                    }
                  ],
                  attrs: { type: "date" },
                  domProps: { value: _vm.expire_date },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.expire_date = $event.target.value
                    }
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.checkType == 1
              ? _c(
                  "button",
                  {
                    attrs: {
                      disabled: !(_vm.quantity > 0 && _vm.purchase_order)
                    },
                    on: {
                      click: function($event) {
                        return _vm.check(1)
                      }
                    }
                  },
                  [_vm._v("Check in\n        ")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.checkType == 0
              ? _c(
                  "button",
                  {
                    attrs: {
                      disabled: !(
                        _vm.quantity > 0 && _vm.quantity < _vm.product.quantity
                      )
                    },
                    on: {
                      click: function($event) {
                        return _vm.check(0)
                      }
                    }
                  },
                  [_vm._v("\n            Check out\n        ")]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "button",
              {
                on: {
                  click: function($event) {
                    _vm.isCheck = false
                  }
                }
              },
              [_vm._v("cancel")]
            )
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Product/index.vue?vue&type=template&id=09740352&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Product/index.vue?vue&type=template&id=09740352&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.products.length
      ? _c(
          "ul",
          _vm._l(_vm.products, function(product, index) {
            return _c(
              "li",
              [
                _vm._v(
                  _vm._s(product.name) + " - " + _vm._s(product.quantity) + " "
                ),
                _c("check-in", {
                  attrs: { product: product },
                  on: {
                    "new-value": function($event) {
                      return _vm.checkOperation(index, $event)
                    }
                  }
                })
              ],
              1
            )
          }),
          0
        )
      : _c("div", [_vm._v("No data")])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Product/check-in.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/Product/check-in.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _check_in_vue_vue_type_template_id_f7161ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check-in.vue?vue&type=template&id=f7161ad6&scoped=true& */ "./resources/js/components/Product/check-in.vue?vue&type=template&id=f7161ad6&scoped=true&");
/* harmony import */ var _check_in_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check-in.vue?vue&type=script&lang=js& */ "./resources/js/components/Product/check-in.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _check_in_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _check_in_vue_vue_type_template_id_f7161ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _check_in_vue_vue_type_template_id_f7161ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "f7161ad6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Product/check-in.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Product/check-in.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/Product/check-in.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_check_in_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./check-in.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Product/check-in.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_check_in_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Product/check-in.vue?vue&type=template&id=f7161ad6&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/Product/check-in.vue?vue&type=template&id=f7161ad6&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_check_in_vue_vue_type_template_id_f7161ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./check-in.vue?vue&type=template&id=f7161ad6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Product/check-in.vue?vue&type=template&id=f7161ad6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_check_in_vue_vue_type_template_id_f7161ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_check_in_vue_vue_type_template_id_f7161ad6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Product/index.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/Product/index.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_09740352_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=09740352&scoped=true& */ "./resources/js/components/Product/index.vue?vue&type=template&id=09740352&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/components/Product/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_09740352_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_09740352_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "09740352",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Product/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Product/index.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Product/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Product/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Product/index.vue?vue&type=template&id=09740352&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Product/index.vue?vue&type=template&id=09740352&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_09740352_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=09740352&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Product/index.vue?vue&type=template&id=09740352&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_09740352_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_09740352_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);