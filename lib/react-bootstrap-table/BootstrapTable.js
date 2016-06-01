'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _PaginationList = require('./pagination/PaginationList');

var _PaginationList2 = _interopRequireDefault(_PaginationList);

var _ToolBar = require('./toolbar/ToolBar');

var _ToolBar2 = _interopRequireDefault(_ToolBar);

var _TableFilter = require('./TableFilter');

var _TableFilter2 = _interopRequireDefault(_TableFilter);

var _TableDataStore = require('./store/TableDataStore');

var _csv_export_util = require('./csv_export_util');

var _csv_export_util2 = _interopRequireDefault(_csv_export_util);

var _Filter = require('./Filter');

require('./css/react-bootstrap-table-all.css');

require('./css/react-table.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootstrapTable = function (_React$Component) {
    _inherits(BootstrapTable, _React$Component);

    function BootstrapTable(props) {
        _classCallCheck(this, BootstrapTable);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BootstrapTable).call(this, props));

        _this._adjustHeaderWidth = function () {
            var tableHeaderDom = _this.refs.header.refs.container.childNodes[0];
            var tableBodyDom = _this.refs.body.refs.container.childNodes[0];
            if (tableHeaderDom.offsetWidth !== tableBodyDom.offsetWidth) {
                tableHeaderDom.style.width = tableBodyDom.offsetWidth + "px";
            }
            var headerProps = _this.refs.body.getBodyHeaderDomProp();
            _this.refs.header.fitHeader(headerProps, _this.refs.body.refs.container.scrollHeight > _this.refs.body.refs.container.clientHeight);
        };

        _this._attachCellEditFunc();

        if (!Array.isArray(_this.props.data)) {
            _this.store = new _TableDataStore.TableDataStore(_this.props.data.getData());
            _this.props.data.clear();
            _this.props.data.on('change', function (data) {
                _this.store.setData(data);
                _this.setState({
                    data: _this.getTableData()
                });
            });
        } else {
            var copy = _this.props.data.slice();
            _this.store = new _TableDataStore.TableDataStore(copy);
        }

        _this.initTable(_this.props);

        if (_this.filter) {
            (function () {
                var self = _this;
                _this.filter.on('onFilterChange', function (currentFilter) {
                    self.handleFilterData(currentFilter);
                });
            })();
        }

        if (_this.props.selectRow && _this.props.selectRow.selected) {
            var _copy = _this.props.selectRow.selected.slice();
            _this.store.setSelectedRowKey(_copy);
        }

        _this.state = {
            data: _this.getTableData(),
            currPage: _this.props.options.page || 1,
            sizePerPage: _this.props.options.sizePerPage || _Const2.default.SIZE_PER_PAGE_LIST[0],
            selectedRowKeys: _this.store.getSelectedRowKeys()
        };
        return _this;
    }

    _createClass(BootstrapTable, [{
        key: 'initTable',
        value: function initTable(props) {
            var _this2 = this;

            var keyField = props.keyField;


            var isKeyFieldDefined = typeof keyField === 'string' && keyField.length;
            _react2.default.Children.forEach(props.children, function (column) {
                if (column.props.isKey) {
                    if (keyField) {
                        throw "Error. Multiple key column be detected in TableHeaderColumn.";
                    }
                    keyField = column.props.dataField;
                }
                if (column.props.filter) {
                    // a column contains a filter
                    if (!_this2.filter) {
                        // first time create the filter on the BootstrapTable
                        _this2.filter = new _Filter.Filter();
                    }
                    // pass the filter to column with filter
                    column.props.filter.emitter = _this2.filter;
                }
            }, this);

            var colInfos = this.getColumnsDescription(props).reduce(function (prev, curr) {
                prev[curr.name] = curr;
                return prev;
            }, {});

            if (!isKeyFieldDefined && !keyField) throw 'Error. No any key column defined in TableHeaderColumn.\n            Use \'isKey={true}\' to specify a unique column after version 0.5.4.';

            this.store.setProps({
                isPagination: props.pagination,
                keyField: keyField,
                colInfos: colInfos,
                multiColumnSearch: props.multiColumnSearch,
                remote: this.isRemoteDataSource()
            });
        }
    }, {
        key: 'getTableData',
        value: function getTableData() {
            var result = [];

            if (this.props.options.sortName && this.props.options.sortOrder) this.store.sort(this.props.options.sortOrder, this.props.options.sortName);

            if (this.props.pagination) {
                var page = void 0,
                    sizePerPage = void 0;
                if (this.store.isChangedPage()) {
                    sizePerPage = this.state.sizePerPage;
                    page = this.state.currPage;
                } else {
                    sizePerPage = this.props.options.sizePerPage || _Const2.default.SIZE_PER_PAGE_LIST[0];
                    page = this.props.options.page || 1;
                }
                result = this.store.page(page, sizePerPage).get();
            } else {
                result = this.store.get();
            }
            return result;
        }
    }, {
        key: 'getColumnsDescription',
        value: function getColumnsDescription(_ref) {
            var children = _ref.children;

            return children.map(function (column, i) {
                return {
                    name: column.props.dataField,
                    align: column.props.dataAlign,
                    sort: column.props.dataSort,
                    format: column.props.dataFormat,
                    formatExtraData: column.props.formatExtraData,
                    filterFormatted: column.props.filterFormatted,
                    editable: column.props.editable,
                    hidden: column.props.hidden,
                    className: column.props.columnClassName,
                    width: column.props.width,
                    text: column.props.children,
                    sortFunc: column.props.sortFunc,
                    index: i
                };
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initTable(nextProps);
            var options = nextProps.options;
            var selectRow = nextProps.selectRow;


            var nextData = nextProps.data || [];

            this.store.setData(nextData.slice());
            var page = options.page || this.state.currPage;
            var sizePerPage = options.sizePerPage || this.state.sizePerPage;

            // #125
            if (!options.page && page > Math.ceil(nextData.length / sizePerPage)) {
                page = 1;
            }
            var sortInfo = this.store.getSortInfo();
            var sortField = options.sortName || (sortInfo ? sortInfo.sortField : undefined);
            var sortOrder = options.sortOrder || (sortInfo ? sortInfo.order : undefined);
            if (sortField && sortOrder) this.store.sort(sortOrder, sortField);
            var data = this.store.page(page, sizePerPage).get();
            this.setState({
                data: data,
                currPage: page,
                sizePerPage: sizePerPage
            });

            if (selectRow && selectRow.selected) {
                // set default select rows to store.
                var copy = selectRow.selected.slice();
                this.store.setSelectedRowKey(copy);
                this.setState({
                    selectedRowKeys: copy
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._adjustHeaderWidth();
            window.addEventListener('resize', this._adjustHeaderWidth);
            this.refs.body.refs.container.addEventListener('scroll', this._scrollHeader);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this._adjustHeaderWidth);
            this.refs.body.refs.container.removeEventListener('scroll', this._scrollHeader);
            if (this.filter) {
                this.filter.removeAllListeners("onFilterChange");
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this._adjustHeaderWidth();
            this._attachCellEditFunc();
            if (this.props.options.afterTableComplete) this.props.options.afterTableComplete();
        }
    }, {
        key: '_attachCellEditFunc',
        value: function _attachCellEditFunc() {
            if (this.props.cellEdit) {
                this.props.cellEdit.__onCompleteEdit__ = this.handleEditCell.bind(this);
                if (this.props.cellEdit.mode !== _Const2.default.CELL_EDIT_NONE) this.props.selectRow.clickToSelect = false;
            }
        }

        /**
         * Returns true if in the current configuration,
         * the datagrid should load its data remotely.
         *
         * @param  {Object}  [props] Optional. If not given, this.props will be used
         * @return {Boolean}
         */

    }, {
        key: 'isRemoteDataSource',
        value: function isRemoteDataSource(props) {
            return (props || this.props).remote;
        }
    }, {
        key: 'render',
        value: function render() {
            var tableClass = (0, _classnames2.default)("react-bs-table");
            var childrens = this.props.children;
            var style = {
                height: this.props.height,
                maxHeight: this.props.maxHeight
            };
            if (!Array.isArray(this.props.children)) {
                childrens = [this.props.children];
            }
            var columns = this.getColumnsDescription(this.props);
            var sortInfo = this.store.getSortInfo();
            var pagination = this.renderPagination();
            var toolBar = this.renderToolBar();
            var tableFilter = this.renderTableFilter(columns);
            var isSelectAll = this.isSelectAll();
            return _react2.default.createElement(
                'div',
                { className: 'react-bs-container', ref: 'table' },
                toolBar,
                _react2.default.createElement(
                    'div',
                    { className: 'react-bs-table-container',
                        onMouseEnter: this.handleMouseEnter.bind(this),
                        onMouseLeave: this.handleMouseLeave.bind(this),
                        style: style },
                    _react2.default.createElement(
                        _TableHeader2.default,
                        {
                            ref: 'header',
                            rowSelectType: this.props.selectRow.mode,
                            hideSelectColumn: this.props.selectRow.hideSelectColumn,
                            sortName: sortInfo ? sortInfo.sortField : undefined,
                            sortOrder: sortInfo ? sortInfo.order : undefined,
                            onSort: this.handleSort.bind(this),
                            onSelectAllRow: this.handleSelectAllRow.bind(this),
                            bordered: this.props.bordered,
                            condensed: this.props.condensed,
                            isFiltered: this.filter ? true : false,
                            isSelectAll: isSelectAll },
                        this.props.children
                    ),
                    _react2.default.createElement(_TableBody2.default, {
                        height: this.props.height,
                        maxHeight: this.props.maxHeight,
                        ref: 'body',
                        data: this.state.data,
                        columns: columns,
                        trClassName: this.props.trClassName,
                        striped: this.props.striped,
                        bordered: this.props.bordered,
                        hover: this.props.hover,
                        keyField: this.store.getKeyField(),
                        condensed: this.props.condensed,
                        selectRow: this.props.selectRow,
                        cellEdit: this.props.cellEdit,
                        selectedRowKeys: this.state.selectedRowKeys,
                        onRowClick: this.handleRowClick.bind(this),
                        onRowMouseOver: this.handleRowMouseOver.bind(this),
                        onRowMouseOut: this.handleRowMouseOut.bind(this),
                        onSelectRow: this.handleSelectRow.bind(this),
                        noDataText: this.props.options.noDataText
                    })
                ),
                tableFilter,
                pagination
            );
        }
    }, {
        key: 'isSelectAll',
        value: function isSelectAll() {
            var defaultSelectRowKeys = this.store.getSelectedRowKeys();
            var allRowKeys = this.store.getAllRowkey();
            if (defaultSelectRowKeys.length !== allRowKeys.length) {
                return defaultSelectRowKeys.length === 0 ? false : 'indeterminate';
            } else {
                return true;
            }
        }
    }, {
        key: 'cleanSelected',
        value: function cleanSelected() {
            this.store.setSelectedRowKey([]);
            this.setState({
                selectedRowKeys: []
            });
        }
    }, {
        key: 'handleSort',
        value: function handleSort(order, sortField) {
            if (this.props.options.onSortChange) {
                this.props.options.onSortChange(sortField, order, this.props);
            }

            var result = this.store.sort(order, sortField).get();
            this.setState({
                data: result
            });
        }
    }, {
        key: 'handlePaginationData',
        value: function handlePaginationData(page, sizePerPage) {
            var onPageChange = this.props.options.onPageChange;

            if (onPageChange) {
                onPageChange(page, sizePerPage);
            }

            if (this.isRemoteDataSource()) {
                return;
            }

            var result = this.store.page(page, sizePerPage).get();
            this.setState({
                data: result,
                currPage: page,
                sizePerPage: sizePerPage
            });
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            if (this.props.options.onMouseLeave) {
                this.props.options.onMouseLeave();
            }
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter() {
            if (this.props.options.onMouseEnter) {
                this.props.options.onMouseEnter();
            }
        }
    }, {
        key: 'handleRowMouseOut',
        value: function handleRowMouseOut(row) {
            if (this.props.options.onRowMouseOut) {
                this.props.options.onRowMouseOut(row);
            }
        }
    }, {
        key: 'handleRowMouseOver',
        value: function handleRowMouseOver(row) {
            if (this.props.options.onRowMouseOver) {
                this.props.options.onRowMouseOver(row);
            }
        }
    }, {
        key: 'handleRowClick',
        value: function handleRowClick(row) {
            if (this.props.options.onRowClick) {
                this.props.options.onRowClick(row);
            }
        }
    }, {
        key: 'handleSelectAllRow',
        value: function handleSelectAllRow(e) {
            var isSelected = e.currentTarget.checked;
            var selectedRowKeys = [];
            var result = true;
            if (this.props.selectRow.onSelectAll) {
                result = this.props.selectRow.onSelectAll(isSelected, isSelected ? this.store.get() : []);
            }

            if (typeof result === 'undefined' || result !== false) {
                if (isSelected) {
                    selectedRowKeys = this.store.getAllRowkey();
                }

                this.store.setSelectedRowKey(selectedRowKeys);
                this.setState({
                    selectedRowKeys: selectedRowKeys
                });
            }
        }
    }, {
        key: 'handleShowOnlySelected',
        value: function handleShowOnlySelected() {
            this.store.ignoreNonSelected();
            var result = void 0;
            if (this.props.pagination) {
                result = this.store.page(1, this.state.sizePerPage).get();
            } else {
                result = this.store.get();
            }
            this.setState({
                data: result,
                currPage: 1
            });
        }
    }, {
        key: 'handleSelectRow',
        value: function handleSelectRow(row, isSelected) {
            var currSelected = this.store.getSelectedRowKeys();
            var rowKey = row[this.store.getKeyField()];
            var result = true;
            if (this.props.selectRow.onSelect) {
                result = this.props.selectRow.onSelect(row, isSelected);
            }

            if (typeof result === 'undefined' || result !== false) {
                if (this.props.selectRow.mode === _Const2.default.ROW_SELECT_SINGLE) {
                    currSelected = isSelected ? [rowKey] : [];
                } else {
                    if (isSelected) {
                        currSelected.push(rowKey);
                    } else {
                        currSelected = currSelected.filter(function (key) {
                            return rowKey !== key;
                        });
                    }
                }

                this.store.setSelectedRowKey(currSelected);
                this.setState({
                    selectedRowKeys: currSelected
                });
            }
        }
    }, {
        key: 'handleEditCell',
        value: function handleEditCell(newVal, rowIndex, colIndex) {
            var fieldName = void 0;
            _react2.default.Children.forEach(this.props.children, function (column, i) {
                if (i == colIndex) {
                    fieldName = column.props.dataField;
                    return false;
                }
            });

            var result = this.store.edit(newVal, rowIndex, fieldName).get();
            this.setState({
                data: result
            });

            if (this.props.cellEdit.afterSaveCell) {
                this.props.cellEdit.afterSaveCell(this.state.data[rowIndex], fieldName, newVal);
            }
        }
    }, {
        key: 'handleAddRowBegin',
        value: function handleAddRowBegin() {
            if (this.refs.body) {
                // this.refs.body.cancelEdit();
            }
        }
    }, {
        key: 'handleAddRow',
        value: function handleAddRow(newObj) {
            var msg = null,
                result = void 0;
            try {
                this.store.add(newObj);
            } catch (e) {
                return e;
            }

            if (this.props.pagination) {
                //if pagination is enabled and insert row be trigger, change to last page
                var sizePerPage = this.state.sizePerPage;

                var currLastPage = Math.ceil(this.store.getDataNum() / sizePerPage);
                result = this.store.page(currLastPage, sizePerPage).get();
                this.setState({
                    data: result,
                    currPage: currLastPage
                });
            } else {
                result = this.store.get();
                this.setState({
                    data: result
                });
            }

            if (this.props.options.afterInsertRow) {
                this.props.options.afterInsertRow(newObj);
            }
        }
    }, {
        key: 'getSizePerPage',
        value: function getSizePerPage() {
            return this.state.sizePerPage;
        }
    }, {
        key: 'getCurrentPage',
        value: function getCurrentPage() {
            return this.state.currPage;
        }
    }, {
        key: 'handleDropRow',
        value: function handleDropRow(rowKeys) {
            var that = this;
            var dropRowKeys = rowKeys ? rowKeys : this.store.getSelectedRowKeys();
            //add confirm before the delete action if that option is set.
            if (dropRowKeys && dropRowKeys.length > 0) {
                if (this.props.options.handleConfirmDeleteRow) {
                    this.props.options.handleConfirmDeleteRow(function () {
                        that.deleteRow(dropRowKeys);
                    });
                } else if (confirm('Are you sure want delete?')) {
                    this.deleteRow(dropRowKeys);
                }
            }
        }
    }, {
        key: 'deleteRow',
        value: function deleteRow(dropRowKeys) {

            var result = void 0;
            this.store.remove(dropRowKeys); //remove selected Row
            this.store.setSelectedRowKey([]); //clear selected row key

            if (this.props.pagination) {
                var sizePerPage = this.state.sizePerPage;
                var currPage = this.state.currPage;

                var currLastPage = Math.ceil(this.store.getDataNum() / sizePerPage);
                if (currPage > currLastPage) currPage = currLastPage;
                result = this.store.page(currPage, sizePerPage).get();
                this.setState({
                    data: result,
                    selectedRowKeys: this.store.getSelectedRowKeys(),
                    currPage: currPage
                });
            } else {
                result = this.store.get();
                this.setState({
                    data: result,
                    selectedRowKeys: this.store.getSelectedRowKeys()
                });
            }
            if (this.props.options.afterDeleteRow) {
                this.props.options.afterDeleteRow(dropRowKeys);
            }
        }
    }, {
        key: 'handleFilterData',
        value: function handleFilterData(filterObj) {
            this.store.filter(filterObj);
            var result = void 0;
            if (this.props.pagination) {
                var sizePerPage = this.state.sizePerPage;

                result = this.store.page(1, sizePerPage).get();
            } else {
                result = this.store.get();
            }
            if (this.props.options.afterColumnFilter) this.props.options.afterColumnFilter(filterObj, this.store.getDataIgnoringPagination());
            this.setState({
                data: result,
                currPage: 1
            });
        }
    }, {
        key: 'handleExportCSV',
        value: function handleExportCSV() {
            var result = this.store.getDataIgnoringPagination();
            var keys = [];
            this.props.children.map(function (column) {
                if (column.props.hidden === false) {
                    keys.push(column.props.dataField);
                }
            });
            (0, _csv_export_util2.default)(result, keys, this.props.csvFileName);
        }
    }, {
        key: 'handleSearch',
        value: function handleSearch(searchText) {
            this.store.search(searchText);
            var result = void 0;
            if (this.props.pagination) {
                var sizePerPage = this.state.sizePerPage;

                result = this.store.page(1, sizePerPage).get();
            } else {
                result = this.store.get();
            }
            if (this.props.options.afterSearch) this.props.options.afterSearch(searchText, this.store.getDataIgnoringPagination());
            this.setState({
                data: result,
                currPage: 1
            });
        }
    }, {
        key: 'renderPagination',
        value: function renderPagination() {
            if (this.props.pagination) {
                var dataSize = void 0;
                if (this.isRemoteDataSource()) {
                    dataSize = this.props.fetchInfo.dataTotalSize;
                } else {
                    dataSize = this.store.getDataNum();
                }
                return _react2.default.createElement(
                    'div',
                    { className: 'table-footer-pagination' },
                    _react2.default.createElement(_PaginationList2.default, {
                        ref: 'pagination',
                        currPage: this.state.currPage,
                        changePage: this.handlePaginationData.bind(this),
                        sizePerPage: this.state.sizePerPage,
                        sizePerPageList: this.props.options.sizePerPageList || _Const2.default.SIZE_PER_PAGE_LIST,
                        paginationSize: this.props.options.paginationSize || _Const2.default.PAGINATION_SIZE,
                        remote: this.isRemoteDataSource(),
                        dataSize: dataSize,
                        onSizePerPageList: this.props.options.onSizePerPageList,
                        prePage: this.props.options.prePage || _Const2.default.PRE_PAGE,
                        nextPage: this.props.options.nextPage || _Const2.default.NEXT_PAGE,
                        firstPage: this.props.options.firstPage || _Const2.default.FIRST_PAGE,
                        lastPage: this.props.options.lastPage || _Const2.default.LAST_PAGE
                    })
                );
            }
            return null;
        }
    }, {
        key: 'renderToolBar',
        value: function renderToolBar() {
            var enableShowOnlySelected = this.props.selectRow && this.props.selectRow.showOnlySelected;
            if (enableShowOnlySelected || this.props.insertRow || this.props.deleteRow || this.props.search || this.props.exportCSV) {
                var columns = void 0;
                if (Array.isArray(this.props.children)) {
                    columns = this.props.children.map(function (column) {
                        var props = column.props;
                        return {
                            name: props.children,
                            field: props.dataField,
                            //when you want same auto generate value and not allow edit, example ID field
                            autoValue: props.autoValue || false,
                            //for create editor, no params for column.editable() indicate that editor for new row
                            editable: props.editable && typeof props.editable === "function" ? props.editable() : props.editable,
                            format: props.dataFormat ? function (value) {
                                return props.dataFormat(value, null, props.formatExtraData).replace(/<.*?>/g, '');
                            } : false
                        };
                    });
                } else {
                    columns = [{
                        name: this.props.children.props.children,
                        field: this.props.children.props.dataField,
                        editable: this.props.children.props.editable
                    }];
                }
                return _react2.default.createElement(
                    'div',
                    { className: 'tool-bar' },
                    _react2.default.createElement(_ToolBar2.default, {
                        clearSearch: this.props.options.clearSearch,
                        enableInsert: this.props.insertRow,
                        enableDelete: this.props.deleteRow,
                        enableSearch: this.props.search,
                        enableExportCSV: this.props.exportCSV,
                        enableShowOnlySelected: enableShowOnlySelected,
                        columns: columns,
                        searchPlaceholder: this.props.searchPlaceholder,
                        onAddRow: this.handleAddRow.bind(this),
                        onAddRowBegin: this.handleAddRowBegin.bind(this),
                        onDropRow: this.handleDropRow.bind(this),
                        onSearch: this.handleSearch.bind(this),
                        onExportCSV: this.handleExportCSV.bind(this),
                        onShowOnlySelected: this.handleShowOnlySelected.bind(this)
                    })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderTableFilter',
        value: function renderTableFilter(columns) {
            if (this.props.columnFilter) {
                return _react2.default.createElement(_TableFilter2.default, { columns: columns,
                    rowSelectType: this.props.selectRow.mode,
                    onFilter: this.handleFilterData.bind(this) });
            } else {
                return null;
            }
        }
    }, {
        key: '_scrollHeader',
        value: function _scrollHeader(e) {
            if (this.refs != undefined) {
                this.refs.header.refs.container.scrollLeft = e.currentTarget.scrollLeft;
            }
        }
    }]);

    return BootstrapTable;
}(_react2.default.Component);

BootstrapTable.propTypes = {
    keyField: _react2.default.PropTypes.string,
    height: _react2.default.PropTypes.string,
    maxHeight: _react2.default.PropTypes.string,
    data: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]),
    remote: _react2.default.PropTypes.bool, // remote data, default is false
    striped: _react2.default.PropTypes.bool,
    bordered: _react2.default.PropTypes.bool,
    hover: _react2.default.PropTypes.bool,
    condensed: _react2.default.PropTypes.bool,
    pagination: _react2.default.PropTypes.bool,
    searchPlaceholder: _react2.default.PropTypes.string,
    selectRow: _react2.default.PropTypes.shape({
        mode: _react2.default.PropTypes.oneOf([_Const2.default.ROW_SELECT_NONE, _Const2.default.ROW_SELECT_SINGLE, _Const2.default.ROW_SELECT_MULTI]),
        bgColor: _react2.default.PropTypes.string,
        selected: _react2.default.PropTypes.array,
        onSelect: _react2.default.PropTypes.func,
        onSelectAll: _react2.default.PropTypes.func,
        clickToSelect: _react2.default.PropTypes.bool,
        hideSelectColumn: _react2.default.PropTypes.bool,
        clickToSelectAndEditCell: _react2.default.PropTypes.bool,
        showOnlySelected: _react2.default.PropTypes.bool
    }),
    cellEdit: _react2.default.PropTypes.shape({
        mode: _react2.default.PropTypes.string,
        blurToSave: _react2.default.PropTypes.bool,
        afterSaveCell: _react2.default.PropTypes.func
    }),
    insertRow: _react2.default.PropTypes.bool,
    deleteRow: _react2.default.PropTypes.bool,
    search: _react2.default.PropTypes.bool,
    columnFilter: _react2.default.PropTypes.bool,
    trClassName: _react2.default.PropTypes.any,
    options: _react2.default.PropTypes.shape({
        clearSearch: _react2.default.PropTypes.bool,
        sortName: _react2.default.PropTypes.string,
        sortOrder: _react2.default.PropTypes.string,
        afterTableComplete: _react2.default.PropTypes.func,
        afterDeleteRow: _react2.default.PropTypes.func,
        afterInsertRow: _react2.default.PropTypes.func,
        afterSearch: _react2.default.PropTypes.func,
        afterColumnFilter: _react2.default.PropTypes.func,
        onRowClick: _react2.default.PropTypes.func,
        page: _react2.default.PropTypes.number,
        sizePerPageList: _react2.default.PropTypes.array,
        sizePerPage: _react2.default.PropTypes.number,
        paginationSize: _react2.default.PropTypes.number,
        onSortChange: _react2.default.PropTypes.func,
        onPageChange: _react2.default.PropTypes.func,
        onSizePerPageList: _react2.default.PropTypes.func,
        noDataText: _react2.default.PropTypes.string,
        handleConfirmDeleteRow: _react2.default.PropTypes.func,
        prePage: _react2.default.PropTypes.string,
        nextPage: _react2.default.PropTypes.string,
        firstPage: _react2.default.PropTypes.string,
        lastPage: _react2.default.PropTypes.string
    }),
    fetchInfo: _react2.default.PropTypes.shape({
        dataTotalSize: _react2.default.PropTypes.number
    }),
    exportCSV: _react2.default.PropTypes.bool,
    csvFileName: _react2.default.PropTypes.string
};
BootstrapTable.defaultProps = {
    height: "100%",
    maxHeight: undefined,
    striped: false,
    bordered: true,
    hover: false,
    condensed: false,
    pagination: false,
    searchPlaceholder: undefined,
    selectRow: {
        mode: _Const2.default.ROW_SELECT_NONE,
        bgColor: _Const2.default.ROW_SELECT_BG_COLOR,
        selected: [],
        onSelect: undefined,
        onSelectAll: undefined,
        clickToSelect: false,
        hideSelectColumn: false,
        clickToSelectAndEditCell: false,
        showOnlySelected: false
    },
    cellEdit: {
        mode: _Const2.default.CELL_EDIT_NONE,
        blurToSave: false,
        afterSaveCell: undefined
    },
    insertRow: false,
    deleteRow: false,
    search: false,
    multiColumnSearch: false,
    columnFilter: false,
    trClassName: '',
    options: {
        clearSearch: false,
        sortName: undefined,
        sortOrder: undefined,
        afterTableComplete: undefined,
        afterDeleteRow: undefined,
        afterInsertRow: undefined,
        afterSearch: undefined,
        afterColumnFilter: undefined,
        onRowClick: undefined,
        onMouseLeave: undefined,
        onMouseEnter: undefined,
        onRowMouseOut: undefined,
        onRowMouseOver: undefined,
        page: undefined,
        sizePerPageList: _Const2.default.SIZE_PER_PAGE_LIST,
        sizePerPage: undefined,
        paginationSize: _Const2.default.PAGINATION_SIZE,
        onSizePerPageList: undefined,
        noDataText: undefined,
        handleConfirmDeleteRow: undefined,
        prePage: _Const2.default.PRE_PAGE,
        nextPage: _Const2.default.NEXT_PAGE,
        firstPage: _Const2.default.FIRST_PAGE,
        lastPage: _Const2.default.LAST_PAGE
    },
    fetchInfo: {
        dataTotalSize: 0
    },
    exportCSV: false,
    csvFileName: undefined
};

exports.default = BootstrapTable;