import * as React from 'react';
import img from '@/assets/logo.svg';
import css from './App.scss';

interface AppProps {}
interface AppState {
  count: number;
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    count: 0,
  };
  constructor(props: AppProps) {
    super(props);
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <React.Fragment>
        <img src={img} alt="" className={css.logo} />
        <button onClick={this.increment} className={css.mybutton}>
          {this.state.count} click
        </button>
      </React.Fragment>
    );
  }
}

export default App;
