import { Component } from "react";

class ErrorBoundry extends Component {
    constructor(){
        super();
        this.state = { hasError: false };
    }
    // is a classbased component only
    // it make this component to an Error Boundry
    componentDidCatch(error, info){
        this.setState({ hasError: true });
        
    }
    render() {
        if(this.state.hasError){
            return <p>Something went wrong!</p>;
        }
        return this.props.children;
    }
}

export default ErrorBoundry;