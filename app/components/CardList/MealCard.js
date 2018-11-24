import React from 'react';
import { Card } from 'antd-mobile';

const MealCard = () => (
  <Card>
    <Card.Header
      title="This is title"
      thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
      extra={<span>this is extra</span>}
    />
    <Card.Body>
      <div>This is content of `Card`</div>
    </Card.Body>
    <Card.Footer
      content="footer content"
      extra={<div>extra footer content</div>}
    />
  </Card>
);

export default MealCard;
