class Category < ActiveRecord::Base
  attr_accessible :budget_id, :name

  has_many :transactions
  belongs_to :budget
  
end
