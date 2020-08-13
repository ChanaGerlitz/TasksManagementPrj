const addTaskType = 'ADD_TASK';
const tasksListType = 'TASKS_LIST';
const allTasksType = 'All_TASKS';
const updateErrorMsgType = 'UPDATE_ERROR_MSG';
const initialState = {
  tasks: [],
  allTasks: [],
  errorMsg: ''
};


export const actionCreators = {
  addTask: task => (dispatch, getState) => {
    fetch('api/TasksManagement/UpdateTasksList', {
      method: 'post',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(task),
    }).then(response => response.json())
      .then(data => {
        if (JSON.parse(data)["metaData"].msgCode === 1)
          dispatch({ type: updateErrorMsgType, value: JSON.parse(data)["metaData"].msgDescription });
        else
          dispatch({ type: addTaskType, value: JSON.parse(data)["data"] })
      });
  },
  getAllTasks: () => (dispatch, getState) => {
    const url = `api/TasksManagement/GetAllTasks`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (JSON.parse(data)["metaData"].msgCode === 1)
          dispatch({ type: updateErrorMsgType, value: JSON.parse(data)["metaData"].msgDescription })
        else
          dispatch({ type: allTasksType, value: JSON.parse(data)["data"] })
      });
  },
  getUserTasks: () => (dispatch, getState) => {
    const url = `api/TasksManagement/GetUserTasks`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (JSON.parse(data)["metaData"].msgCode === 1)
          dispatch({ type: updateErrorMsgType, value: JSON.parse(data)["metaData"].msgDescription })
        else
          dispatch({ type: tasksListType, value: JSON.parse(data)["data"] })
      });
  }
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case addTaskType: {
      return {
        ...state,
        tasks: action.value
      }
    }
    case tasksListType: {
      return {
        ...state,
        tasks: action.value
      };
    }
    case allTasksType: {
      return {
        ...state,
        allTasks: action.value
      };
    }
    case updateErrorMsgType: {
      return {
        ...state,
        errorMsg: action.value
      };
    }
    default: return state;
  }
};
