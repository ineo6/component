'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableDataStore = exports.TableDataSet = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Const = require('../Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;

function _sort(arr, sortField, order, sortFunc) {
  order = order.toLowerCase();
  arr.sort(function (a, b) {
    if (sortFunc) {
      return sortFunc(a, b, order);
    } else {
      if (order == _Const2.default.SORT_DESC) {
        return a[sortField] > b[sortField] ? -1 : a[sortField] < b[sortField] ? 1 : 0;
      } else {
        return a[sortField] < b[sortField] ? -1 : a[sortField] > b[sortField] ? 1 : 0;
      }
    }
  });

  return arr;
}

var TableDataSet = exports.TableDataSet = function (_EventEmitter) {
  _inherits(TableDataSet, _EventEmitter);

  function TableDataSet(data) {
    _classCallCheck(this, TableDataSet);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TableDataSet).call(this, data));

    _this.data = data;
    return _this;
  }

  _createClass(TableDataSet, [{
    key: 'setData',
    value: function setData(data) {
      this.emit('change', data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.data = null;
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this.data;
    }
  }]);

  return TableDataSet;
}(EventEmitter);

var TableDataStore = function () {
  function TableDataStore(data) {
    _classCallCheck(this, TableDataStore);

    this.data = data;
    this.colInfos = null;
    this.filteredData = null;
    this.isOnFilter = false;
    this.filterObj = null;
    this.searchText = null;
    this.sortObj = null;
    this.pageObj = {};
    this.selected = [];
    this.multiColumnSearch = false;
    this.showOnlySelected = false;
    this.remote = false; // remote data
  }

  _createClass(TableDataStore, [{
    key: 'setProps',
    value: function setProps(props) {
      this.keyField = props.keyField;
      this.enablePagination = props.isPagination;
      this.colInfos = props.colInfos;
      this.remote = props.remote;
      this.multiColumnSearch = props.multiColumnSearch;
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      this.data = data;
      if (this.isOnFilter) {
        if (null !== this.filterObj) this.filter(this.filterObj);
        if (null !== this.searchText) this.search(this.searchText);
      }
      if (this.sortObj) {
        this.sort(this.sortObj.order, this.sortObj.sortField);
      }
    }
  }, {
    key: 'getSortInfo',
    value: function getSortInfo() {
      return this.sortObj;
    }
  }, {
    key: 'setSelectedRowKey',
    value: function setSelectedRowKey(selectedRowKeys) {
      this.selected = selectedRowKeys;
    }
  }, {
    key: 'getSelectedRowKeys',
    value: function getSelectedRowKeys() {
      return this.selected;
    }
  }, {
    key: 'getCurrentDisplayData',
    value: function getCurrentDisplayData() {
      if (this.isOnFilter) return this.filteredData;else return this.data;
    }
  }, {
    key: 'ignoreNonSelected',
    value: function ignoreNonSelected() {
      var _this2 = this;

      this.showOnlySelected = !this.showOnlySelected;
      if (this.showOnlySelected) {
        this.isOnFilter = true;
        this.filteredData = this.data.filter(function (row) {
          var result = _this2.selected.find(function (x) {
            return row[_this2.keyField] === x;
          });
          return typeof result !== 'undefined' ? true : false;
        });
      } else {
        this.isOnFilter = false;
      }
    }
  }, {
    key: 'sort',
    value: function sort(order, sortField) {
      this.sortObj = {
        order: order,
        sortField: sortField
      };

      var currentDisplayData = this.getCurrentDisplayData();
      if (!this.colInfos[sortField]) return this;

      var sortFunc = this.colInfos[sortField].sortFunc;

      currentDisplayData = _sort(currentDisplayData, sortField, order, sortFunc);

      return this;
    }
  }, {
    key: 'page',
    value: function page(_page, sizePerPage) {
      this.pageObj.end = _page * sizePerPage - 1;
      this.pageObj.start = this.pageObj.end - (sizePerPage - 1);
      return this;
    }
  }, {
    key: 'edit',
    value: function edit(newVal, rowIndex, fieldName) {
      var currentDisplayData = this.getCurrentDisplayData();
      var rowKeyCache = void 0;
      if (!this.enablePagination) {
        currentDisplayData[rowIndex][fieldName] = newVal;
        rowKeyCache = currentDisplayData[rowIndex][this.keyField];
      } else {
        currentDisplayData[this.pageObj.start + rowIndex][fieldName] = newVal;
        rowKeyCache = currentDisplayData[this.pageObj.start + rowIndex][this.keyField];
      }
      if (this.isOnFilter) {
        this.data.forEach(function (row) {
          if (row[this.keyField] === rowKeyCache) {
            row[fieldName] = newVal;
          }
        }, this);
        if (null !== this.filterObj) this.filter(this.filterObj);
        if (null !== this.searchText) this.search(this.searchText);
      }
      return this;
    }
  }, {
    key: 'add',
    value: function add(newObj) {
      if (!newObj[this.keyField] || newObj[this.keyField].toString() === '') {
        throw this.keyField + " can't be empty value.";
      }
      var currentDisplayData = this.getCurrentDisplayData();
      currentDisplayData.forEach(function (row) {
        if (row[this.keyField].toString() === newObj[this.keyField].toString()) {
          throw this.keyField + " " + newObj[this.keyField] + " already exists";
        }
      }, this);

      currentDisplayData.push(newObj);
      if (this.isOnFilter) {
        this.data.push(newObj);
      }
    }
  }, {
    key: 'remove',
    value: function remove(rowKey) {
      var currentDisplayData = this.getCurrentDisplayData();
      var result = currentDisplayData.filter(function (row) {
        return rowKey.indexOf(row[this.keyField]) == -1;
      }, this);

      if (this.isOnFilter) {
        this.data = this.data.filter(function (row) {
          return rowKey.indexOf(row[this.keyField]) == -1;
        }, this);
        this.filteredData = result;
      } else {
        this.data = result;
      }
    }
  }, {
    key: 'filter',
    value: function filter(filterObj) {
      var _this3 = this;

      if (Object.keys(filterObj).length == 0) {
        this.filteredData = null;
        this.isOnFilter = false;
        this.filterObj = null;
      } else {
        this.filterObj = filterObj;
        this.filteredData = this.data.filter(function (row) {
          var valid = true;
          var filterVal = void 0;
          for (var key in filterObj) {
            var targetVal = row[key];

            switch (filterObj[key].type) {
              case _Const2.default.FILTER_TYPE.NUMBER:
                {
                  filterVal = filterObj[key].value.number;
                  break;
                }
              case _Const2.default.FILTER_TYPE.CUSTOM:
                {
                  filterVal = _typeof(filterObj[key].value) === "object" ? undefined : typeof filterObj[key].value === "string" ? filterObj[key].value.toLowerCase() : filterObj[key].value;
                  break;
                }
              default:
                {
                  filterVal = typeof filterObj[key].value === "string" ? filterObj[key].value.toLowerCase() : filterObj[key].value;
                  if (filterVal === undefined) {
                    // Support old filter
                    filterVal = filterObj[key].toLowerCase();
                  }
                  break;
                }
            }

            if (_this3.colInfos[key]) {
              var _colInfos$key = _this3.colInfos[key];
              var format = _colInfos$key.format;
              var filterFormatted = _colInfos$key.filterFormatted;
              var formatExtraData = _colInfos$key.formatExtraData;

              if (filterFormatted && format) {
                targetVal = format(row[key], row, formatExtraData);
              }
            }

            switch (filterObj[key].type) {
              case _Const2.default.FILTER_TYPE.NUMBER:
                {
                  valid = _this3.filterNumber(targetVal, filterVal, filterObj[key].value.comparator);
                  break;
                }
              case _Const2.default.FILTER_TYPE.DATE:
                {
                  valid = _this3.filterDate(targetVal, filterVal);
                  break;
                }
              case _Const2.default.FILTER_TYPE.CUSTOM:
                {
                  valid = _this3.filterCustom(targetVal, filterVal, filterObj[key].value);
                  break;
                }
              default:
                {
                  valid = _this3.filterText(targetVal, filterVal);
                  break;
                }
            }
            if (!valid) {
              break;
            }
          }
          return valid;
        });
        this.isOnFilter = true;
      }
    }
  }, {
    key: 'filterNumber',
    value: function filterNumber(targetVal, filterVal, comparator) {
      var valid = true;
      switch (comparator) {
        case "=":
          {
            if (targetVal != filterVal) {
              valid = false;
            }
            break;
          }
        case ">":
          {
            if (targetVal <= filterVal) {
              valid = false;
            }
            break;
          }
        case ">=":
          {
            if (targetVal < filterVal) {
              valid = false;
            }
            break;
          }
        case "<":
          {
            if (targetVal >= filterVal) {
              valid = false;
            }
            break;
          }
        case "<=":
          {
            if (targetVal > filterVal) {
              valid = false;
            }
            break;
          }
        case "!=":
          {
            if (targetVal == filterVal) {
              valid = false;
            }
            break;
          }
        default:
          {
            console.error("Number comparator provided is not supported");
            break;
          }
      }
      return valid;
    }
  }, {
    key: 'filterDate',
    value: function filterDate(targetVal, filterVal) {
      return targetVal.getDate() == filterVal.getDate() && targetVal.getMonth() == filterVal.getMonth() && targetVal.getFullYear() == filterVal.getFullYear();
    }
  }, {
    key: 'filterCustom',
    value: function filterCustom(targetVal, filterVal, callbackInfo) {
      if (callbackInfo != null && (typeof callbackInfo === 'undefined' ? 'undefined' : _typeof(callbackInfo)) === "object") {
        return callbackInfo.callback(targetVal, callbackInfo.callbackParameters);
      }

      return filterText(targetVal, filterVal);
    }
  }, {
    key: 'filterText',
    value: function filterText(targetVal, filterVal) {
      if (targetVal.toString().toLowerCase().indexOf(filterVal) == -1) {
        return false;
      }

      return true;
    }
  }, {
    key: 'search',
    value: function search(searchText) {
      var _this4 = this;

      if (searchText.trim() === "") {
        this.filteredData = null;
        this.isOnFilter = false;
        this.searchText = null;
      } else {
        this.searchText = searchText;
        var searchTextArray = [];

        if (this.multiColumnSearch) {
          searchTextArray = searchText.split(' ');
        } else {
          searchTextArray.push(searchText);
        }

        this.filteredData = this.data.filter(function (row) {
          var keys = Object.keys(row);
          var valid = false;
          // Changed `for .. in` loop to use `Object.keys`

          var _loop = function _loop(i) {
            var key = keys[i];
            if (_this4.colInfos[key] && row[key]) {
              searchTextArray.forEach(function (text) {
                var filterVal = text.toLowerCase();
                var targetVal = row[key];
                var _colInfos$key2 = _this4.colInfos[key];
                var format = _colInfos$key2.format;
                var filterFormatted = _colInfos$key2.filterFormatted;
                var formatExtraData = _colInfos$key2.formatExtraData;
                var hidden = _colInfos$key2.hidden;

                if (!hidden) {
                  if (filterFormatted && format) {
                    targetVal = format(targetVal, row, formatExtraData);
                  }
                  if (targetVal.toString().toLowerCase().indexOf(filterVal) !== -1) {
                    valid = true;
                  }
                }
              });
              if (valid) return 'break';
            }
          };

          for (var i = 0; i < keys.length; i++) {
            var _ret = _loop(i);

            if (_ret === 'break') break;
          }
          return valid;
        });
        this.isOnFilter = true;
      }
    }
  }, {
    key: 'getDataIgnoringPagination',
    value: function getDataIgnoringPagination() {
      var _data = this.getCurrentDisplayData();
      return _data;
    }
  }, {
    key: 'get',
    value: function get() {
      var _data = this.getCurrentDisplayData();

      if (_data.length == 0) return _data;

      if (this.remote || !this.enablePagination) {
        return _data;
      } else {
        var result = [];
        for (var i = this.pageObj.start; i <= this.pageObj.end; i++) {
          result.push(_data[i]);
          if (i + 1 == _data.length) break;
        }
        return result;
      }
    }
  }, {
    key: 'getKeyField',
    value: function getKeyField() {
      return this.keyField;
    }
  }, {
    key: 'getDataNum',
    value: function getDataNum() {
      return this.getCurrentDisplayData().length;
    }
  }, {
    key: 'isChangedPage',
    value: function isChangedPage() {
      return this.pageObj.start && this.pageObj.end ? true : false;
    }
  }, {
    key: 'getAllRowkey',
    value: function getAllRowkey() {
      return this.data.map(function (row) {
        return row[this.keyField];
      }, this);
    }
  }]);

  return TableDataStore;
}();

exports.TableDataStore = TableDataStore;

;