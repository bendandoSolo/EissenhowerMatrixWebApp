
// Done! A file called 'My Document.docx' will be in your file system.

import { Packer } from 'docx';
import { saveAs } from 'file-saver';

import { experiences, education, skills, achievements } from '../../services/cv-data';
import { DocumentCreator } from '../../services/cv-generator';

const MyDocument = (): JSX.Element => {
  function generate (): void {
        const documentCreator = new DocumentCreator();
        const doc = documentCreator.create([
          experiences,
          education,
          skills,
          achievements
        ]);

        void Packer.toBlob(doc).then(blob => {
          console.log(blob);
          saveAs(blob, 'example.docx');
          console.log('Document created successfully');
        });
      }

    return (
        <>
        <h2>This is my basic document</h2>
        <div>
        <p>
          Start editing to see some magic happen :)
          <button onClick={generate}>Generate CV with docx!</button>
        </p>
      </div>
        </>
    );
}

export default MyDocument;