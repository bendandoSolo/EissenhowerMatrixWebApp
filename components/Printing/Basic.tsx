
// Done! A file called 'My Document.docx' will be in your file system.

import { Packer } from 'docx';
import { saveAs } from 'file-saver';

import { DocumentCreator } from '../../services/planner-generator';
import useTodos from '../../hooks/useTodos';
import TodoType from '../../types/Todo';

const MyDocument = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { status, data, error, isFetching } = useTodos();

  const hasPriority = (todo: TodoType): boolean => todo.priority !== 0;

  // eslint-disable-next-line no-extra-boolean-cast
  const PrioritizedData	= data == null ? ' ' : data.filter(hasPriority);

  function generate (): void {
        const documentCreator = new DocumentCreator();
        // const doc = documentCreator.create([
        //   experiences,
        //   education,
        //   skills,
        //   achievements
        // ]);

        const doc = documentCreator.create(PrioritizedData);

        void Packer.toBlob(doc).then(blob => {
          console.log(blob);
          saveAs(blob, 'example.docx');
          console.log('Document created successfully');
        });
      }

    return (
        <>
        <h2>Print Weekly Planning Document</h2>
        <div>
        <p>
			<button onClick={generate}>Generate CV with docx!</button>
			{status === 'loading'
				? (
					'Loading...'
				)
				: status === 'error'
					? (
						<span>Error: {error.message}</span>
					)
					: (
						<p>{ JSON.stringify(PrioritizedData) }</p>
					)}
        </p>
      </div>
        </>
    );
}

export default MyDocument;