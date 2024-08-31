import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID, createTodo, updateTodo } from '../../api/todos';

type HeaderProps = {
  onSubmit: (newTodo: Todo) => void;
  onErrorMessage: (error: string) => void;
  onTempTodo: (tempTodo: Todo | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  todos: Todo[];
  onToggleTodo: (toggledTodos: Todo[]) => void;
  numOfCompletedTodos: number;
};

export const Header: React.FC<HeaderProps> = ({
  onSubmit,
  onErrorMessage,
  onTempTodo,
  inputRef,
  todos,
  onToggleTodo,
  numOfCompletedTodos,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [submitting]);

  const handleTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleReset = () => {
    setTodoTitle('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      onErrorMessage('Title should not be empty');

      return;
    }

    setSubmitting(true);

    onTempTodo({
      title: trimmedTitle,
      completed: false,
      userId: USER_ID,
      id: 0,
    });

    createTodo({
      title: trimmedTitle,
      completed: false,
      userId: USER_ID,
    })
      .then(newTodo => {
        onSubmit(newTodo);
        handleReset();
        onTempTodo(null);
      })
      .catch(() => {
        onErrorMessage('Unable to add a todo');
        onTempTodo(null);
      })
      .finally(() => setSubmitting(false));
  };

  const handleToggleAll = () => {
    let toggledTodos: Todo[] = [];

    if (todos.length === numOfCompletedTodos || numOfCompletedTodos === 0) {
      toggledTodos = todos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      }));
    } else {
      toggledTodos = todos
        .filter(todo => !todo.completed)
        .map(todo => ({
          ...todo,
          completed: true,
        }));
    }

    setSubmitting(true);

    const toggleStatusPromises = toggledTodos.map(todo =>
      updateTodo(todo).then(() => todo),
    );

    const successfullyToggleTodos: Todo[] = [];

    Promise.allSettled(toggleStatusPromises)
      .then(results => {
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            onErrorMessage('Unable to toggle a todo');
          } else {
            successfullyToggleTodos.push(toggledTodos[index]);

            onToggleTodo(successfullyToggleTodos);
          }
        });
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length !== 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.length === numOfCompletedTodos,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
          disabled={submitting}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleTodoTitle}
          disabled={submitting}
        />
      </form>
    </header>
  );
};
