import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  useMediaQuery,
} from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';

import Modal from 'components/Modal';
import ModalFormCreateUpdateTodo from 'components/ModalFormCreateUpdateTodo';
import Confirmation from 'components/Confirmation';

import { deleteTodo, updateTodo } from 'redux/todos/todos-operations';

import styles from './TodoItem.module.scss';

const TodoItem = ({ todo, action }) => {
  const { _id: id, description, isDone } = todo;
  const [showModal, setShowModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleToggleModal = () => setShowModal(!showModal);
  const handleToggleConfirmation = () => setOpenConfirmation(!openConfirmation);
  const handleCompleted = () => dispatch(updateTodo(id, { isDone: !isDone }));
  const handleDeleteTask = async () => {
    await dispatch(deleteTodo(id));
    action(true);
  };

  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const mobile = useMediaQuery(handleMaxWidth(600));

  return (
    <>
      {openConfirmation && (
        <Confirmation
          open={openConfirmation}
          onClose={handleToggleConfirmation}
          onDelete={handleDeleteTask}
        />
      )}
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <ModalFormCreateUpdateTodo
            todo={todo}
            onCloseModal={handleToggleModal}
            type="update"
          />
        </Modal>
      )}

      <ListItem className={styles.todoItem} divider>
        <div className={styles.first}>
          <Checkbox
            color="primary"
            checked={isDone}
            onChange={handleCompleted}
          />
        </div>
        <ListItemText className={styles.todoText} onClick={handleToggleModal}>
          {description}
        </ListItemText>
        <div className={styles.last}>
          <IconButton
            size={mobile ? 'small' : 'medium'}
            aria-label="Update task"
            type="button"
            onClick={handleToggleModal}
            title={intl.formatMessage({ id: 'update_task' })}
          >
            <Edit />
          </IconButton>

          <IconButton
            size={mobile ? 'small' : 'medium'}
            aria-label="Delete"
            type="button"
            onClick={handleToggleConfirmation}
            title={intl.formatMessage({ id: 'delete_task' })}
          >
            <DeleteForever />
          </IconButton>
        </div>
      </ListItem>
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
  action: PropTypes.func.isRequired,
};

export default TodoItem;
