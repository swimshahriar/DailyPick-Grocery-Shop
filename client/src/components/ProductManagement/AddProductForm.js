import React, { useState } from 'react';
import {
  TextField,
  Card,
  CardActions,
  CardContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { AddCircleOutlineOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import useStyles from './AddProductFormStyles';
import { useHttpClient } from '../../hooks/useHttpClient';
import BackdropLoader from '../BackdropLoader/BackdropLoader';

const AddProductForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [unitQty, setUnitQty] = useState('');

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const imageUrlChangeHandler = (event) => {
    setImageUrl(event.target.value);
  };

  const unitQtyChangeHandler = (event) => {
    setUnitQty(event.target.value);
  };

  // Making http request to the server
  const submitHandler = async (event) => {
    event.preventDefault();
    clearError();

    try {
      await sendRequest(
        'http://localhost:8000/api/product/add',
        'POST',
        JSON.stringify({
          title,
          description,
          price,
          imageUrl,
          category,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/admin/products');
    } catch (error) {}
  };

  return (
    <>
      {isLoading && <BackdropLoader isLoading={isLoading} />}
      <form
        className={classes.addForm}
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <Card>
          <CardContent className={classes.inputFieldContainer}>
            {error && (
              <Typography component="p" color="error">
                {error}
              </Typography>
            )}
            <TextField
              required
              id="title"
              label="Title"
              variant="filled"
              className={classes.inputField}
              value={title}
              onChange={titleChangeHandler}
            />
            <TextField
              required
              multiline
              rows={4}
              id="description"
              label="Description"
              variant="filled"
              className={classes.inputField}
              value={description}
              onChange={descriptionChangeHandler}
            />
            <TextField
              required
              id="price"
              label="Price"
              variant="filled"
              type="number"
              className={classes.inputField}
              value={price}
              onChange={priceChangeHandler}
            />
            <TextField
              required
              id="unitQty"
              label="Unit Quantity"
              variant="filled"
              type="string"
              className={classes.inputField}
              value={unitQty}
              onChange={unitQtyChangeHandler}
            />
            <TextField
              required
              id="imageUrl"
              label="Image Url"
              variant="filled"
              className={classes.inputField}
              value={imageUrl}
              onChange={imageUrlChangeHandler}
            />
            <FormControl variant="filled" className={classes.inputField}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                required
                labelId="category"
                id="category"
                value={category}
                onChange={categoryChangeHandler}
              >
                <MenuItem value={'Fruits and Vegetables'}>
                  Fruits and Vegetables
                </MenuItem>
                <MenuItem value={'Meat and Fish'}>Meat and Fish</MenuItem>
                <MenuItem value={'Snacks'}>Snacks</MenuItem>
                <MenuItem value={'Dairy'}>Dairy</MenuItem>
                <MenuItem value={'Cooking'}>Cooking</MenuItem>
                <MenuItem value={'Breakfast'}>Breakfast</MenuItem>
                <MenuItem value={'Beverage'}>Beverage</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              startIcon={<AddCircleOutlineOutlined />}
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submitBtn}
            >
              Add Product
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default AddProductForm;
