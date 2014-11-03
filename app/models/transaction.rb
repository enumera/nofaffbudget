class Transaction < ActiveRecord::Base
  attr_accessible :amount, :category_id, :weekly_budget_id

  belongs_to :category
  belongs_to :weekly_budget

  

end
