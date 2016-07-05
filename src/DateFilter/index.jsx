import React, {Component, PropTypes as T} from 'react';
import {Button, Input} from 'antd';
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;

const FilterType = {
    YEAR: 'MM',
    MONTH: 'dd',
    DAY: 'HH',
    ALL: 'yyyy'
}

export default
class DateFilter extends Component {
    constructor(props) {

        super(props)

        const {defaultType, defaultValue, disabledAllBtn} = this.props;

        const {preDisabled, nextDisabled} = this.getPreNextDisabled(defaultType, defaultValue);

        this.state = {
            type: defaultType,
            value: new Date(defaultValue),
            preDisabled,
            nextDisabled,
            disabledAllBtn,
        }
    }

    static FilterType = FilterType;



    static defaultProps = {
        defaultType: FilterType.MONTH,
        defaultValue: new Date(),
        maxYear: new Date().getFullYear(),
        maxMonth: new Date().getMonth() + 1,
        maxDay: new Date().getDate(),
        disabledAllBtn: false,
        hasDay: false,
        hasAll: true,
    }


    componentWillReceiveProps(nextProps) {
        const {disabledAllBtn} = nextProps;
        if (disabledAllBtn !== this.props.disabledAllBtn) {
            this.setState({disabledAllBtn});
        }
    }

    render() {

        const {style, hasDay, hasAll} = this.props;

        const {preDisabled, nextDisabled, disabledAllBtn} = this.state;

        const formatValue = this.getFormatValue();

        const {dayBtnType, monthBtnType, yearBtnType, allBtnType}  = this.getBtnType();

        return (
            <div className="ant-search-input-wrapper" style={style}>
                <InputGroup className='ant-search-input' style={{display: 'flex' }}>
                    <Input readOnly="readonly" value={formatValue}
                           style={{borderTopRightRadius: '0', borderBottomRightRadius: '0'}}/>
                    <ButtonGroup className="ant-input-group-wrap" style={{display: 'flex' }}>
                        <Button onClick={ this.onPreClick.bind(this) } disabled={ disabledAllBtn || preDisabled }
                                style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}}>{`<<<`}</Button>
                        {hasDay ? <Button onClick={ this.onDayClick.bind(this) } disabled={ disabledAllBtn }
                                          type={ dayBtnType }>日</Button> : null}
                        <Button onClick={ this.onMonthClick.bind(this) } disabled={ disabledAllBtn }
                                type={ monthBtnType }>月</Button>
                        <Button onClick={ this.onYearClick.bind(this) } disabled={ disabledAllBtn }
                                type={ yearBtnType }>年</Button>
                        {
                           !!hasAll ? <Button onClick={ this.onAllClick.bind(this) } disabled={ disabledAllBtn } type={ allBtnType }>所有</Button> : null
                        }
                        <Button onClick={ this.onNextClick.bind(this) }
                                disabled={ disabledAllBtn || nextDisabled }>{`>>>`}</Button>
                    </ButtonGroup>
                </InputGroup>
            </div>
        );
    }

    getBtnType() {

        const result = {
            dayBtnType: '',
            monthBtnType: '',
            yearBtnType: '',
            allBtnType: '',
        }

        const {type} = this.state;

        const {YEAR, MONTH, DAY, ALL} = FilterType

        switch (type) {
            case YEAR:
                result.yearBtnType = 'primary'
                break;
            case MONTH:
                result.monthBtnType = 'primary'
                break;
            case DAY:
                result.dayBtnType = "primary"
                break;
            case ALL:
                result.allBtnType = 'primary'
                break;
        }

        return result;

    }

    getFormatValue() {

        const {type, value} = this.state;

        const {YEAR, MONTH, DAY, ALL} = FilterType

        let result;

        switch (type) {
            case YEAR:
                result = `${value.getFullYear()}年`
                break;
            case MONTH:
                result = `${value.getFullYear()}年${value.getMonth() + 1}月`
                break;
            case DAY:
                result = `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日`
                break;
            case ALL:
            default:
                result = '历年'
                break;
        }

        return result;

    }

    onPreClick() {

        const {type, value} = this.state;

        const {YEAR, MONTH, DAY, ALL} = FilterType

        switch (type) {
            case YEAR:
                value.setFullYear(value.getFullYear() - 1);
                break;
            case MONTH:
                value.setFullYear(value.getFullYear(), value.getMonth() - 1);
                break;
            case DAY:
                value.setFullYear(value.getFullYear(), value.getMonth(), value.getDate() - 1);
                break;
            case ALL:
            default:
                return;
        }

        this.setState({value}, this.didAfterChange);

    }

    onDayClick() {

        this.setState({type: FilterType.DAY, value: new Date()}, this.didAfterChange);

    }

    onMonthClick() {

        this.setState({type: FilterType.MONTH, value: new Date()}, this.didAfterChange);

    }

    onYearClick() {

        this.setState({type: FilterType.YEAR, value: new Date()}, this.didAfterChange);

    }

    onAllClick() {

        this.setState({type: FilterType.ALL}, this.didAfterChange);

    }

    onNextClick() {

        const {type, value} = this.state;

        const {YEAR, MONTH, DAY, ALL} = FilterType;

        const {maxYear, maxMonth, maxDay} = this.props;

        switch (type) {
            case YEAR:
                if (value.getFullYear() == maxYear) {
                    return;
                }
                value.setFullYear(value.getFullYear() + 1);
                break;
            case MONTH:
                if (value.getFullYear() == maxYear && value.getMonth() == maxMonth - 1) {
                    return;
                }
                value.setFullYear(value.getFullYear(), value.getMonth() + 1);
                break;
            case DAY:
                if (value.getFullYear() == maxYear && value.getMonth() == maxMonth - 1 && value.getDate() == maxDay) {
                    return;
                }
                value.setFullYear(value.getFullYear(), value.getMonth(), value.getDate() + 1);
                break;
            case ALL:
            default:
                return;
        }

        this.setState({value}, this.didAfterChange);
    }

    didAfterChange() {

        const {type, value} = this.state;

        const {preDisabled, nextDisabled} = this.getPreNextDisabled(type, value);


        this.setState({
            preDisabled,
            nextDisabled
        }, this.fireOnChange);


    }

    getPreNextDisabled(type, value) {

        const {YEAR, MONTH, DAY, ALL} = FilterType;

        const {maxYear, maxMonth, maxDay} = this.props;

        let preDisabled = false, nextDisabled = false;

        switch (type) {
            case YEAR:
                if (value.getFullYear() == maxYear) {
                    nextDisabled = true;
                }
                break;
            case MONTH:
                if (value.getFullYear() == maxYear && value.getMonth() == maxMonth - 1) {
                    nextDisabled = true;
                }
                break;
            case DAY:
                if (value.getFullYear() == maxYear && value.getMonth() == maxMonth - 1 && value.getDate() == maxDay) {
                    nextDisabled = true;
                }
                break;
            case ALL:
                preDisabled = true;
                nextDisabled = true;
                break;
            default:
                break;
        }

        return {preDisabled, nextDisabled}
    }

    fireOnChange() {

        const {value, type} = this.state;

        this.props.onChange && this.props.onChange(value, type);

    }

    getCurrentInfo() {

        const {type, value} = this.state;

        return {type, value};

    }
}
