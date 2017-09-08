SELECT
      customer.id as customer_id,
      customer.firstName as customer_first_name,
      orderDetails.category_id as category_id,
      orderDetails.category_name as category_name,
      sum(orderDetails.quantity)as number_purchased
    from
        customer , orderDetails
    where
    customer.id =orderDetails.userid
    GROUP BY
    customer_first_name,customer.id,category_id,category_name;