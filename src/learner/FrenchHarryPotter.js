import React from 'react';
import VocabTable from './VocabTable.js'
import Paragraph from './Paragraph.js'

import Chapter1 from './Chapter1.json'

class FrenchHarryPotter extends React.Component {
  render() {
    return (
      <div>
        <VocabTable vocabList={Chapter1.title}/>
        {Chapter1.paragraphs.map((paragraph) => (
          <div key={"paragraph" + paragraph.id}>
            <Paragraph
              paragraphId={paragraph.id}
              sentences={paragraph.sentences}
            />
            <VocabTable vocabList={paragraph.vocabList} />
          </div>
        ))}
      </div>
    );
  }
}

export default FrenchHarryPotter;
