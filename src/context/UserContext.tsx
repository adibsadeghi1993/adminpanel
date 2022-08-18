import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type * as types from "./types";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TryRounded } from "@mui/icons-material";

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
  });

  const filterUser=()=>{
    
  }

  const fetchAllUsers = useCallback(async () => {
   if(state.text.length>=3){
     
    const response = await axios.get(`http://localhost:4000/users?q=${state.text}`);
    const usersCount = response.data.length;
    const pageCount = Math.ceil(usersCount / 4);
    setState((prevState) => ({
      ...prevState,
      pageCount,
    }));
   }else{
    const response = await axios.get(`http://localhost:4000/users`);
    const usersCount = response.data.length;
    const pageCount = Math.ceil(usersCount / 4);
    setState((prevState) => ({
      ...prevState,
      pageCount,
    })); 
   }
  }, [state.text]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

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

   if(state.text.length>=3){
    const response = await axios.get(
      `http://localhost:4000/users?q=${state.text}&_page=${state.pageNo}&_limit=4`
    );

    console.log(response);

    setState((prevState) => ({
      ...prevState,
      users: response.data,
      loading: false,
    }));
   }else{
    const response = await axios.get(
      `http://localhost:4000/users?&_page=${state.pageNo}&_limit=4`
    );

    console.log(response);

    setState((prevState) => ({
      ...prevState,
      users: response.data,
      loading: false,
    }));
   }
  }, [state.pageNo,state.text]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addNewUser = async (data: types.IAddUser) => {
    const response = await axios.post("http://localhost:4000/users", data);
    console.log(response);
    if (response.status === 201) {
      setState((prevState) => ({
        ...prevState,
        isOpenModal: false,
      }));
      fetchData();
      fetchAllUsers();
    }
  };

  const handleEditUser = async (id: number) => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: true,
      mode: "edit",
      loading: true,
    }));

    const response = await axios.get(`http://localhost:4000/users/${id}`);
    setState((prevState) => ({
      ...prevState,
      edit: {
        data: response.data,
        id: id,
      },
      loading: false,
    }));
  };

  const editUser = async (data: types.IAddUser) => {
    const response = await axios.put(
      `http://localhost:4000/users/${state.edit.id}`,
      data
    );
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
    fetchData();
  };

  const handleDeleteUser = async (id: number) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    fetchData();
    fetchAllUsers();

    if (state.users.length === 1) {
      setState((prevState) => ({
        ...prevState,
        pageNo: prevState.pageNo - 1,
      }));
    }
  };

  const handelTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      text: e.target.value,
    }));
  };

  const values: types.IContextValues = {
    ...state,
    handleClickOpen,
    handleClose,
    handlePageChange,
    addNewUser,
    handleEditUser,
    editUser,
    handleDeleteUser,
    handelTextChange,
  };

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
};

export const useConsumeContext = () => useContext(userContext);

export default UserContext;
