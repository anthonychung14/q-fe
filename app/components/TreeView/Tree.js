import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

// import AutoSizer from 'react-virtualized-auto-sizer';
// import { FixedSizeTree as Tree } from 'react-vtree';
export function* treeWalker(refresh) {
  const stack = [];

  // Remember all the necessary data of the first node in the stack.
  stack.push({
    nestingLevel: 0,
    node: tree,
  });

  // Walk through the tree until we have no nodes available.
  while (stack.length !== 0) {
    const {
      node: { children, id, name },
      nestingLevel,
    } = stack.pop();

    // Here we are sending the information about the node to the Tree component
    // and receive an information about the openness state from it. The
    // `refresh` parameter tells us if the full update of the tree is requested;
    // basing on it we decide to return the full node data or only the node
    // id to update the nodes order.
    const isOpened = yield refresh
      ? {
          id,
          isLeaf: children.length === 0,
          isOpenByDefault: true,
          name,
          nestingLevel,
        }
      : id;

    // Basing on the node openness state we are deciding if we need to render
    // the child nodes (if they exist).
    if (node.children.length !== 0 && isOpened) {
      // Since it is a stack structure, we need to put nodes we want to render
      // first to the end of the stack.
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({
          nestingLevel: nestingLevel + 1,
          node: node.children[i],
        });
      }
    }
  }
}
