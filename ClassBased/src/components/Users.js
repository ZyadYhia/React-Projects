import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ];


class Users extends Component {
  constructor() {
    // we use super() to call the constructor of the parent class
    // only when we have a constructor in the child class
    super();
    // in classbased components, we can use constructor to initialize state
    // i have only one state and should be an object nothing else
    // it manages all sates i'll use later  in this component
    this.state = {
      showUsers: true,
      more: 'test',
    };
  }
  toggleUsersHandler() {
    // this will keep other states as it is and only change the state we want to change
    // by merging the new state with the old state
    // this.setState({ showUsers: !this.state.showUsers });
    this.setState(currState => ({ showUsers: !currState.showUsers }));
  }
  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error('No users provided!');
    }
  }
  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
    return (
      <div className={classes.users}>
        {/* we added .bind(this) to make sure that this is bound to the component not to the render function */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}


// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;