<?php
class Roles
{
    public $role_aid;
    public $role_is_active;
    public $role_name;
    public $role_description;
    public $role_created;
    public $role_updated;

    public $connection;
    public $lastInsertedId;

    public $tblSettingsRoles;
    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsRoles = "settings_roles";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsRoles} ";
            $sql .= "(";
            $sql .= " role_is_active, ";
            $sql .= " role_name, ";
            $sql .= " role_description, ";
            $sql .= " role_created, ";
            $sql .= " role_updated ";
            $sql .= ") values ( ";
            $sql .= " :role_is_active, ";
            $sql .= " :role_name, ";
            $sql .= " :role_description, ";
            $sql .= " :role_created, ";
            $sql .= " :role_updated ";
            $sql .= " )";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "role_is_active" => $this->role_is_active,
                "role_name" => $this->role_name,
                "role_description" => $this->role_description,
                "role_created" => $this->role_created,
                "role_updated" => $this->role_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();

        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function readAll()
    {
        try {
            $sql = " select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsRoles}";
            $query = $this->connection->query($sql);

        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblSettingsRoles} set ";
            $sql .= "role_name = :role_name, ";
            $sql .= "role_description = :role_description, ";
            $sql .= "role_updated = :role_updated ";
            $sql .= "where role_aid = :role_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "role_name" => $this->role_name,
                "role_description" => $this->role_description,
                "role_updated" => $this->role_updated,
                "role_aid" => $this->role_aid
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblSettingsRoles} set ";
            $sql .= "role_is_active = :role_is_active, ";
            $sql .= "role_updated = :role_updated ";
            $sql .= "where role_aid = :role_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "role_is_active" => $this->role_is_active,
                "role_updated" => $this->role_updated,
                "role_aid" => $this->role_aid
            ]);
        } catch (PDOException $e) {
            returnError($e);//use for debugging // use it if error is invalid request error
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblSettingsRoles} ";
            $sql .= "where role_aid = :role_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "role_aid" => $this->role_aid
            ]);
        } catch (PDOException $e) {
            returnError($e);//use for debugging // use it if error is invalid request error
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = " select ";
            $sql .= " role_name ";
            $sql .= " from {$this->tblSettingsRoles}";
            $sql .= " where role_name = :role_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "role_name" => $this->role_name,
            ]);


        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

}