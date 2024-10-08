import React from 'react';
import { SelectedStatus, Todo } from '../../types/Todo';
import cn from 'classnames';
import { deleteTodo } from '../../api/todos';

type FooterProps = {
  todos: Todo[];
  selectedStatus: string;
  setStatus: (e: React.MouseEvent<HTMLElement>) => void;
  onErrorMessage: (error: string) => void;
  onDeleteCompletedTodo: (todos: Todo[]) => void;
  numOfCompletedTodos: number;
  numOfActiveTodos: number;
};

export const Footer: React.FC<FooterProps> = ({
  todos,
  selectedStatus,
  setStatus,
  onDeleteCompletedTodo,
  onErrorMessage,
  numOfActiveTodos,
  numOfCompletedTodos,
}) => {
  const handleDeleteAllCompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    const deletePromises = completedTodos.map(todo =>
      deleteTodo(todo.id).then(() => todo),
    );

    const successfullyDeletedTodos: Todo[] = [];

    Promise.allSettled(deletePromises).then(results => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          onErrorMessage('Unable to delete a todo');
        } else {
          successfullyDeletedTodos.push(completedTodos[index]);

          onDeleteCompletedTodo(successfullyDeletedTodos);
        }
      });
    });
  };

  return (
    <>
      {/* Hide the footer if there are no todos */}
      {!!todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${numOfActiveTodos} items left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            {Object.values(SelectedStatus).map(status => (
              <a
                key={status}
                href="#/"
                className={cn('filter__link', {
                  selected: selectedStatus === status,
                })}
                data-cy={`FilterLink${status}`}
                onClick={setStatus}
              >
                {status}
              </a>
            ))}
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handleDeleteAllCompletedTodos}
            disabled={numOfCompletedTodos === 0}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
