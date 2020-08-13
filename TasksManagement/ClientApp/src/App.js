import React from 'react';
import { connect } from 'react-redux';
import AddTask from './components/AddTask';
import TasksList from './components/TasksList';
const App = (props) => {
  return (
    <div className="App">
      <div className="navbar">
        <h1>Tasks Management</h1>
      </div>
      {props.errorMsg !== '' ?
        <div className="error-page">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="error-template">
                  <h1>
                    Oops!</h1>
                  <h2>You get error:
                       </h2>
                  <div className="error-details">
                    {props.errorMsg}
                  </div>
                  <div className="error-actions">
                    <button onClick={(e) => window.location.reload()} className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home">Take Me Home</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="container">
          <div className="row">
            <div className="col-lg-6 addTask">
              <AddTask />
            </div>
            <div className="col-lg-6 tasksListDiv">
              <TasksList />
            </div>
          </div>
        </div >
      }
    </div>
  )
};
const mapStateToProps = state => {
  return state.Task
}
export default connect(mapStateToProps)(App)  