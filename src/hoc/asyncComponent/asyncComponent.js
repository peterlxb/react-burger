import React,{ Component } from 'react';

const asyncComponent = (importComponent) => {
  //返回一个class base组件
  return class extends Component {
    state = {
      component:null
    }

    componentDidMount() {
      importComponent().
        then(cmp => {
          this.setState({component: cmp.default});
        });
    }

    render() {
      const C = this.state.Component;

      return C ? <C {...this.props} /> : null;
    }
  }
}

export default asyncComponent;
