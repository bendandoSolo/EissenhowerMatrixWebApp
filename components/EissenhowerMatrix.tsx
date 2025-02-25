import React from 'react';
import PrioritizedTodoList from './Lists/PrioritizedTodoList';

const EissenhowerMatrix = (): JSX.Element => {
    return (
        <div className='eissenhowerMatrix-container'>
              <PrioritizedTodoList priority={1}/>
              <PrioritizedTodoList priority={2}/>
              <PrioritizedTodoList priority={3}/>
              <PrioritizedTodoList priority={4}/>
        </div>
    );
};

export default EissenhowerMatrix;