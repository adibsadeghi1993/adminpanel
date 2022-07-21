import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type * as types from "./types";
import axios from "axios";

const userContext = createContext({} as types.IContextValues);

const UserContext = ({ children }: types.IProps) => {
  const [state, setState] = useState<types.IState>({
    pageNo: 1,
    users: [],
    mode: "add",
    isOpenModal: false,
    text: "",
    loading: false,
    edit: {
      data: null,
      id: null,
    },
    pageCount: 0,
    allUsers: [],
  });

  const fetchAllData = useCallback(async () => {
    const response = await axios.get(`http://localhost:4000/users`);
    console.log(response);
    const dataNumbers = response.data.length;
    const pageNumbers = Math.ceil(dataNumbers / 4);
    setState((prevState) => ({
      ...prevState,
      allUsers: response.data,
      pageCount: pageNumbers,
    }));
  }, []);

 

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  console.log(state.users);

  const handleClickOpen = (): void => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: true,
    }));
  };

  const handleClose = (): void => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setState((prevState) => ({
      ...prevState,
      pageNo: value,
    }));
  };

  const fetchData = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const response = await axios.get(
      `http://localhost:4000/users?_page=${state.pageNo}&_limit=4`
    );
    console.log(response);
    setState((prevState) => ({
      ...prevState,
      users: response.data,
      loading: false,
    }));
  }, [state.pageNo]);

  useEffect(() => {
    if (state.users.length === 0 && state.pageNo > 1) {
      setState((prevState) => ({
        ...prevState,
        pageNo: prevState.pageNo - 1,
      }));
    }
  }, [state.users, state.pageNo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addNewUser = async (data: types.IAddUser) => {
    const response = await axios.post("http://localhost:4000/users", data);
    fetchData();
    fetchAllData();
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
  };

  const handleDeleteUser = async (id: number) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    fetchData();
    fetchAllData();
  };

  const handleEditUser = async (id: number) => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: true,
      loading: true,
      mode: "edit",
      edit: {
        ...prevState.edit,
        id: id,
      },
    }));

    const response = await axios.get(`http://localhost:4000/users/${id}`);

    setState((prevState) => ({
      ...prevState,
      loading: false,
      edit: {
        ...prevState.edit,
        data: response.data,
      },
    }));
  };

  const EditUser = async (data: types.IAddUser) => {
    const response = await axios.put(
      `http://localhost:4000/users/${state.edit.id}`,
      data
    );
    console.log(response);
    if (response.statusText === "OK") {
      fetchData();

      setState((prevState) => ({
        ...prevState,
        isOpenModal: false,
      }));
    }
  };

  const values: types.IContextValues = {
    ...state,
    handleClickOpen,
    handleClose,
    handlePageChange,
    addNewUser,
    handleDeleteUser,
    handleEditUser,
    EditUser,
  };

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
};

export const useConsumeContext = () => useContext(userContext);

export default UserContext;
