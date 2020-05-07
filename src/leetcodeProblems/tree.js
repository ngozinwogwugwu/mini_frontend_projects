import React from 'react';
import Tree from 'react-d3-tree';

export class TreeNode {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
    return this
  }
}

export const arrayToTree = (treeArray, i=0) => {
  if (treeArray === undefined || i >= treeArray.length) {
    return null
  }
  const node = new TreeNode(treeArray[i])
  node.left = arrayToTree(treeArray, 2*i + 1)
  node.right = arrayToTree(treeArray, 2*i + 2)
  return node
}

export const stringToArray = arrayString => {
  if (arrayString === "" || arrayString === null) {
    return [0]
  }
  return arrayString.split(",").map((numString) => {
    let number = parseInt(numString);
    if (Number.isNaN(number)) {
      number = null
    }
    return number;
  })
}

export const treeToJson = rootNode => {
  if (rootNode === null || rootNode === undefined || rootNode.value === null) {
    return null
  }

  let children = []
  const leftNode = treeToJson(rootNode.left)
  if (leftNode !== null) {
    children.push(leftNode)
  }

  const rightNode = treeToJson(rootNode.right)
  if (rightNode !== null) {
    children.push(rightNode)
  }

  const treeJson = {
    name: rootNode.value,
    children: children
  }

  return treeJson
}

export const arrayToJson = treeArray => {
  return treeToJson(arrayToTree(treeArray))
}


export class DislayTree extends React.Component {
  render() {
    return (
      <div id="treeWrapper" style={{height: '30em', width: '30em', border: '3px solid black'}}>
        { this.props.tree && <Tree orientation="vertical" data={[treeToJson(this.props.tree)]} /> }
        { !this.props.tree && <Tree orientation="vertical" data={[arrayToJson(this.props.treeArray)]} /> }
      </div>
    );
  }
}

