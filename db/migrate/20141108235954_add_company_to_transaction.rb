class AddCompanyToTransaction < ActiveRecord::Migration
  def change
    add_column :transactions, :company, :string
  end
end
