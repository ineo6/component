'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BootstrapTable = require('./BootstrapTable');

var _BootstrapTable2 = _interopRequireDefault(_BootstrapTable);

var _TableHeaderColumn = require('./TableHeaderColumn');

var _TableHeaderColumn2 = _interopRequireDefault(_TableHeaderColumn);

var _TableDataStore = require('./store/TableDataStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_BootstrapTable2.default.TableHeaderColumn = _TableHeaderColumn2.default;
_BootstrapTable2.default.TableDataSet = _TableDataStore.TableDataSet;
exports.default = _BootstrapTable2.default;