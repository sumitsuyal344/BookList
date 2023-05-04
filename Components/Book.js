import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";
import { additemToCart } from "@/redux/actions/listactions";
import { useDispatch } from "react-redux";




const CardBook = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 30px;
  margin-left: 30px;
`;
const Container = styled(Box)`
  margin-left: 150px;
  width: 80%;
`;
const Book = ({ book, sortedTitle }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [count,setCount]=useState(1)
  const router = useRouter();
  const dispatch = useDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleTitleClick = () => {
    sortedTitle();
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
  }));

  function handleButtonClick(book) {
    router.push({
      pathname: `/viewCart`,
    });
  }
  function handleAddButtonClick(book) {
    console.log("book",book)
    setCount(count+1)
    book["count"]=count
    dispatch(additemToCart(book));
  }

  return (
    <Container>
      <CardBook>
        <Box style={{ display: "flex" }}>
          <CardHeader
            title={" Book  Title:   " +   book.title}
            onClick={() => handleTitleClick()}
            style={{ cursor: "pointer" }}
            className="cardheader"
          />
          <Box style={{ marginLeft: "auto" }}>
            <AddShoppingCartIcon
              style={{ marginRight: "10px" }}
              className="addbutton"
              onClick={() => handleAddButtonClick(book)}
            >
              Add to Cart
            </AddShoppingCartIcon>
            <ShoppingCartIcon
              className="addbutton"
              onClick={() => handleButtonClick(book)}
            >
              view cart
            </ShoppingCartIcon>
          </Box>
        </Box>

        <CardMedia
          component="img"
          image={book.image}
          alt="Paella dish"
          style={{
            maxWidth: 700,
            maxHeight: 300,
          }}
        />

        <CardContent>
          <Box style={{display:'flex'}}>
          <Typography color="red" variant="h5" >
            {" "}
           Written By:  {book.author}
          </Typography>
          <Typography color="black" variant="h6" style={{marginLeft:'auto',fontWeight:'bold'}} >
            {" "}
           Genre: {book.genre}
          </Typography>
          </Box>
         

          <Typography style={{ marginLeft: "-23px" }}>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <Button variant="text" >read more...</Button>
            </ExpandMore>
          </Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="h6" style={{fontWeight:"bold"}}>
              Description:
            </Typography>
            <Typography paragraph>{book.description}</Typography>
          </CardContent>
        </Collapse>
      </CardBook>
    </Container>
  );
};

export default Book;
