class Transaction < ActiveRecord::Base
  attr_accessible :amount, :category_id, :weekly_budget_id, :company_id

  belongs_to :category
  belongs_to :weekly_budget
  belongs_to :company

  

end
