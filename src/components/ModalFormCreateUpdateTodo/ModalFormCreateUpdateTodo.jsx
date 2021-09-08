import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

import { Checkbox, TextField, Button, FormHelperText } from '@material-ui/core';
import { SaveAltRounded } from '@material-ui/icons';

import { addTodo, updateTodo } from 'redux/todos/todos-operations';

import styles from './ModalFormCreateUpdateTodo.module.scss';

const ModalFormCreateUpdateTodo = ({ todo = {}, onCloseModal, type }) => {
  const { _id: id, description, isDone } = todo;
  const { handleSubmit, register, setValue, getValues, trigger, errors } =
    useForm();
  const [updatedIsDone, setUpdatedsDone] = useState(isDone || false);

  const dispatch = useDispatch();

  const handleCompleted = () => setUpdatedsDone(!updatedIsDone);
  const handleSubmitForm = () => {
    const values = getValues();

    if (values.description === description && isDone === updatedIsDone) {
      onCloseModal();
      return;
    }

    const todo = {
      description: values.description,
      isDone: updatedIsDone,
    };

    if (type === 'update') {
      dispatch(updateTodo(id, todo));
    }

    if (type === 'add') {
      dispatch(addTodo(todo));
    }

    onCloseModal();
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit(handleSubmitForm)}>
      <Checkbox
        color="primary"
        checked={updatedIsDone}
        onChange={handleCompleted}
      />
      <div>
        <RHFInput
          as={<TextField type="text" label="Todo" variant="outlined" />}
          name="description"
          defaultValue={description}
          register={register}
          rules={{ required: 'Description of task is required' }}
          setValue={setValue}
          onChange={() => trigger('description')}
        />
        {errors.description && (
          <FormHelperText>{errors.description?.message}</FormHelperText>
        )}
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<SaveAltRounded>Save</SaveAltRounded>}
      >
        Save
      </Button>
    </form>
  );
};

ModalFormCreateUpdateTodo.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }),
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalFormCreateUpdateTodo;
