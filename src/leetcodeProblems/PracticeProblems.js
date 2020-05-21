import React from 'react';
import TwoSum from './twoSum.js'
import DeleteNodeBST from './deleteNodeBST.js'
import NextGreaterNodeInLinkedList from './nextGreaterNodeInLinkedList.js'


class PracticeProblems extends React.Component {
  render() {
    return (
      <div>
        <NextGreaterNodeInLinkedList />
        <TwoSum />
        <DeleteNodeBST />
      </div>
    );
  }
}

export default PracticeProblems;
