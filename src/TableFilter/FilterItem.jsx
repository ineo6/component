/**
 * Created by neo on 16/4/22.
 */
import React from 'react';
import classNames from 'classnames';

const prefix = 'table-filter-';

let FilterItem = React.createClass({
    render(){
        const props = this.props;
        const {className, float, children, ...others} = props;

        const classes = classNames({
            [`${prefix}item`]: true,
            [`${prefix}${float}-item`]: float,
            [className]: className,
        });

        return (
            <div{...others}
                className={classes}>
                {children}
            </div>
        )
    }
});


export default FilterItem;