<?php

class Users
{
    public $users_aid;
    public $users_is_active;
    public $users_first_name;
    public $users_email;
    public $users_last_name;
    public $users_password;
    public $users_role_id;
    public $users_created;
    public $users_updated;


    public $connection;
    public $start;
    public $total;
    public $search;
    public $lastInsertedId;

    public $tblSettingsRoles;
    public $tblSettingsUsers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsRoles = "settings_roles";
        $this->tblSettingsUsers = "settings_users";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsUsers}";
            $sql .= " ( ";
            $sql .= " users_is_active, ";
            $sql .= " users_first_name, ";
            $sql .= " users_last_name, ";
            $sql .= " users_email, ";
            $sql .= " users_password, ";
            $sql .= " users_role_id, ";
            $sql .= " users_created, ";
            $sql .= " users_updated ";
            $sql .= ") values (";
            $sql .= " :users_is_active, ";
            $sql .= " :users_first_name, ";
            $sql .= " :users_last_name, ";
            $sql .= " :users_email, ";
            $sql .= " :users_password, ";
            $sql .= " :users_role_id, ";
            $sql .= " :users_created, ";
            $sql .= " :users_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_is_active" => $this->users_is_active,
                "users_first_name" => $this->users_first_name,
                "users_last_name" => $this->users_last_name,
                "users_email" => $this->users_email,
                "users_password" => $this->users_password,
                "users_role_id" => $this->users_role_id,
                "users_created" => $this->users_created,
                "users_updated" => $this->users_updated,
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
            // JOINING TABLE
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsUsers} as users, ";
            $sql .= " {$this->tblSettingsRoles} as roles ";
            $sql .= " where users.users_role_id = roles.role_aid ";
            // FILTER
            $sql .= $this->users_is_active != '' ? " and users.users_is_active = :users_is_active " : " ";
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " users.users_first_name like :users_first_name  " : " ";
            $sql .= $this->search != '' ? " or users.users_last_name like :users_last_name  " : " ";
            $sql .= $this->search != '' ? " or users.users_email like :users_email  " : " ";
            $sql .= $this->search != '' ? " or CONCAT(users.users_last_name,' ',users.users_first_name) like :users_last_fullname " : " ";
            $sql .= $this->search != '' ? " or CONCAT(users.users_first_name,' ',users.users_last_name) like :users_first_fullname " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->users_is_active != '' ? ["users_is_active" => $this->users_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "users_first_name" => "%{$this->search}%",
                    "users_last_name" => "%{$this->search}%",
                    "users_email" => "%{$this->search}%",
                    "users_last_fullname" => "%{$this->search}%",
                    "users_first_fullname" => "%{$this->search}%",
                ] : [],
            ]);
        } catch (PROException $e) {
            $query = false;
        }
        return $query;
    }
    public function readLimit()
    {
        try {
            // JOINING TABLE
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsUsers} as users, ";
            $sql .= " {$this->tblSettingsRoles} as roles ";
            $sql .= " where users.users_role_id = roles.role_aid ";
            // FILTER
            $sql .= $this->users_is_active != '' ? " and users.users_is_active = :users_is_active " : " ";
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " users.users_first_name like :users_first_name  " : " ";
            $sql .= $this->search != '' ? " or users.users_last_name like :users_last_name  " : " ";
            $sql .= $this->search != '' ? " or users.users_email like :users_email  " : " ";
            $sql .= $this->search != '' ? " or CONCAT(users.users_last_name,' ',users.users_first_name) like :users_last_fullname " : " ";
            $sql .= $this->search != '' ? " or CONCAT(users.users_first_name,' ',users.users_last_name) like :users_first_fullname " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            // THIS IS FOR PAGINATION LIKE FACEBOOK SCROLLING
            $sql .= "limit :start, ";
            $sql .= " :total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->users_is_active != '' ? ["users_is_active" => $this->users_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "users_first_name" => "%{$this->search}%",
                    "users_last_name" => "%{$this->search}%",
                    "users_email" => "%{$this->search}%",
                    "users_last_fullname" => "%{$this->search}%",
                    "users_first_fullname" => "%{$this->search}%",
                ] : [],
                "start" => $this->start - 1,
                "total" => $this->total,

            ]);
        } catch (PROException $e) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = " update {$this->tblSettingsUsers} set ";
            $sql .= " users_first_name = :users_first_name, ";
            $sql .= " users_last_name = :users_last_name, ";
            $sql .= " users_email = :users_email, ";
            $sql .= " users_role_id = :users_role_id, ";
            $sql .= " users_updated = :users_updated ";
            $sql .= " where users_aid = :users_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_first_name" => $this->users_first_name,
                "users_last_name" => $this->users_last_name,
                "users_email" => $this->users_email,
                "users_role_id" => $this->users_role_id,
                "users_updated" => $this->users_updated,
                "users_aid" => $this->users_aid,
            ]);
        } catch (PDOException $e) {
            // returnError($e); turn on when debugging
            $query = false;
        }
        return $query;
    }
    public function active()
    {
        try {
            $sql = " update {$this->tblSettingsUsers} set ";
            $sql .= " users_is_active = :users_is_active, ";
            $sql .= " users_updated = :users_updated ";
            $sql .= " where users_aid = :users_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_is_active" => $this->users_is_active,
                "users_updated" => $this->users_updated,
                "users_aid" => $this->users_aid,
            ]);
        } catch (PDOException $e) {
            // returnError($e); //turn on whe debugging
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = " delete from {$this->tblSettingsUsers} ";
            $sql .= " where users_aid = :users_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_aid" => $this->users_aid,
            ]);
        } catch (PDOException $e) {
            // returnError($e); //turn on whe debugging
            $query = false;
        }
        return $query;
    }
    public function checkName()
    {
        try {
            $sql = "select ";
            $sql .= " users_first_name, users_last_name ";
            $sql .= " from {$this->tblSettingsUsers} ";
            $sql .= " where users_first_name = :users_first_name ";
            $sql .= " and users_last_name = :users_last_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_first_name" => $this->users_first_name,
                "users_last_name" => $this->users_last_name,
            ]);
        } catch (PROException $e) {
            $query = false;
        }
        return $query;
    }

    public function checkEmail()
    {
        try {
            $sql = "select ";
            $sql .= " users_email ";
            $sql .= " from {$this->tblSettingsUsers} ";
            $sql .= " where users_email = :users_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_email" => $this->users_email,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}
