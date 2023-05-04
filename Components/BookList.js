import { getListData } from "@/redux/actions/listactions";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Book from "./Book";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";



const Container = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;
const ContainerDropDown = styled(Box)`
 width:13%;
 margin:20px 5px 5px 0;
 
`;

const BookList = () => {
  const dataList = useSelector((state) => state.listReducer.dataList);
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("All");
  let [data, setData] = useState(dataList);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    dispatch(getListData("All"));
  }, [dispatch]);

  useEffect(() => {
    setData(dataList);
   
  }, [dataList]);

 
  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const handleGenerClick = (item) => {
    if (item.genre === "All") {
      setData(dataList);
    } else {
      const record = uniqueArray.find((book) => book.genre === item.genre);
      setData([record]);
    }
  };
  let uniqueArray = Array.from(new Set(dataList.map((item) => item.genre))).map(
    (genre) => {
      return dataList.find((item) => item.genre === genre);
    }
  );

  uniqueArray.push({
    id: "11",
    genre: "All",
  });


  const sortArray = (array, isAscending) => {
    return data.sort((a, b) => {
      if (isAscending) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  };
  data = sortArray(data, isAscending);

  const sortedTitle = () => {
    setIsAscending(!isAscending);
  };
  
  return (
    <>
    <Box style={{display:'flex'}} >
    <ContainerDropDown>
    <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genre}
          label="Genre"
          onChange={handleChange}
          style={{color:'rgb(210, 100, 237);',fontWeight:'bold'}}
        >
          {uniqueArray?.map((item, index, arr) => (
            <MenuItem key={item.genre} value={item.genre} onClick={() => handleGenerClick(item)}>
              {item.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ContainerDropDown> 
   
      <Typography variant="h2" color='#2a0845' style={{margin:'10px 320px'}}>
        Book Store
      </Typography>
      </Box>
      {data?.map((book) => (
        <Container key={book.id}>
          <Book book={book} sortedTitle={sortedTitle} />
        </Container>
      ))}
    </>
  );
};

export default BookList;
