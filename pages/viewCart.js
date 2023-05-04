import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Typography,
  CardContent,
  styled,
  CardMedia,
  CardHeader,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Link from "next/link";
import { deleteBook } from "@/redux/actions/listactions";

const CardBook = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-top: 30px;
`;
const Container = styled(Box)`
  margin-left: 150px;
  width: 80%;
`;

const Index = () => {
  let [data1, setData1] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const data = useSelector((state) => state.listReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    setData1(data);
  }, [data]);

  const handleDelete = (item) => {
    let newData = [];
    if (item.count > 1) {
      const newArray = [...filteredData];
      const index = newArray.findIndex((obj) => obj.id === item.id);
      newArray[index] = { ...newArray[index], count: item.count - 1 };
      dispatch(deleteBook(newArray));
    } else if (item.count <= 1) {
      newData = filteredData.filter((book) => book.id !== item.id);
      setData1(newData);
      dispatch(deleteBook(newData));
    }
  };

  const filteredData = data1.filter((obj, index, self) => {
    return index === self.findIndex((t) => t.title === obj.title);
  });

  let sum = 0;
  for (let i = 0; i < filteredData.length; i++) {
    sum += filteredData[i].count;
  }

  return (
    <Container>
      {filteredData.length === 0 ? (
        <Box
          style={{ display: "flex", justifyContent: "center", margin: "150px" }}
        >
          <Link href="/">
            <Typography variant="h5">Add Books </Typography>
          </Link>
        </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            color="green"
            style={{ margin: "30px auto 30px 30px" }}
          >
            Total Price:{sum * 10}$
          </Typography>
          <CardBook style={{ width: "80%" }}>
            {filteredData?.map((item) => (
              <>
                <CardHeader title={item?.title} />
                <CardContent>
                  <Typography variant="h6" color="red">
                    Author: {item?.author}
                  </Typography>
                  <CardMedia
                    component="img"
                    image={item?.image}
                    alt="Paella dish"
                    style={{
                      maxWidth: 100,
                      maxHeight: 100,
                    }}
                  />
                  <Typography>quantity:{item?.count}</Typography>
                  <DeleteRoundedIcon
                    color="red"
                    className="deleteIcon"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </DeleteRoundedIcon>
                </CardContent>
              </>
            ))}
          </CardBook>
        </>
      )}
    </Container>
  );
};

export default Index;
