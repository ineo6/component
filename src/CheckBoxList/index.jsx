import React, {PropTypes as T, Component} from 'react';

import './style.css';


class COM extends Component {
    constructor(props) {

        super(props)


        this.state = {
            data: this.props.defaultData,
        }

    }

    componentWillReceiveProps(nextProps) {

        if (!_.eq(nextProps.defaultData, this.props.defaultData)) {

            this.setState({data: nextProps.defaultData})

        }

    }

    onCheckboxChange(index) {

        const {data} = this.state

        data[index].checked = !data[index].checked

        this.setState({data})

        let selectedItems = this.getCheckedValues();

        this.props.onChange && this.props.onChange(selectedItems)

    }

    getCheckedValues() {
        let items = [];
        this.state.data.forEach(item=> {
            if (item.checked)
                items[items.length] = item.value;
        });

        return items;
    }

    checkAllToggle() {
        const checkedItems = this.getCheckedValues();

        const {data} = this.state

        if (checkedItems.length < data.length) {

            data.map(item =>item.checked = true)

        } else {
            data.map(item =>item.checked = false)
        }
        this.setState({data});
    }

    checkReverseToggle() {
        const {data} = this.state;

        data.map(item =>item.checked = !item.checked)

        this.setState({data})

    }

    onSelectedAllChange() {
        this.checkAllToggle();

        let selectedItems = this.getCheckedValues();

        this.props.onChange && this.props.onChange(selectedItems)
    }

    render() {

        const {data} = this.state

        let {disabled, className, skipSelectAll} = this.props
        disabled = disabled || false
        className = className || 'checkbox-list'

        let selectedAll = false

        const allSeleted = this.getCheckedValues() || [];

        if (allSeleted.length == data.length) {
            selectedAll = true
        }

        const options = data.map((item, index) => {
            return (
                <div key={'chk-' + index} className={className}>
                    <label>
                        <input
                            disabled={ disabled }
                            type="checkbox" value={item.value}
                            onChange={this.onCheckboxChange.bind(this,index)}
                            checked={item.checked}/>
                        <span disabled={ disabled }>{item.label}</span>

                    </label>
                </div>
            )
        });


        if (!skipSelectAll && options && options.length) {
            options.push(
                <div key='chk-all' className={className}>
                    <label>
                        <input
                            disabled={ false }
                            type="checkbox"
                            onChange={this.onSelectedAllChange.bind(this)}
                            checked={selectedAll}/>
                        <span disabled={ false }>全选</span>
                    </label>
                </div>
            );
        }

        return (
            <div className="checkbox-list-group">
                {options}
            </div>
        );
    }
}

COM.propTypes = {
    defaultData: React.PropTypes.array,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string,
    skipSelectAll: React.PropTypes.bool,
}


export default COM
