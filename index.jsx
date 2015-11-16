import React from 'react';
import AutoLayout from 'autolayout';


var AutoLayoutSVG = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    format: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    spacing: React.PropTypes.number,
    extended: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      spacing: 0,
      extended: true,
    };
  },

  render() {
    const {children, width, height, format, spacing, extended} = this.props;

    const constraints = AutoLayout.VisualFormat.parse(format, {extended});
    
    var view = new AutoLayout.View({
      constraints,
      spacing,
      width,
      height,
    });

    return (
      <g>
        {React.Children.map(children, (child) =>
          this.renderChild(child, view)
        )}
      </g>
    );
  },

  renderChild(child, view) {
    const subView = view.subViews[child.props.viewName];
    if (subView) {
      const {left, top, width, height} = subView;
      return (
        <g transform={`translate(${left}, ${top})`}>
          {React.cloneElement(child, {width, height})}
        </g>
      );
    } else {
      return child;
    }
  },
});


AutoLayoutSVG.PropsCallback = React.createClass({
  propTypes: {
    children: React.PropTypes.func.isRequired,
  },

  render() {
    return this.props.children(this.props);
  },
});


export default AutoLayoutSVG;
