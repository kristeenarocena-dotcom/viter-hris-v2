<?php

class Department
{
    public $department_aid;
    public $department_is_active;
    public $department_name;
    public $department_created;
    public $department_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblSettingsDepartment;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsDepartment = "settings_department";
    }

    // CREATE
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsDepartment} ";
            $sql .= "(";
            $sql .= " department_is_active, ";
            $sql .= " department_name, ";
            $sql .= " department_created, ";
            $sql .= " department_updated ";
            $sql .= ") values ( ";
            $sql .= " :department_is_active, ";
            $sql .= " :department_name, ";
            $sql .= " :department_created, ";
            $sql .= " :department_updated ";
            $sql .= " )";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active" => $this->department_is_active,
                "department_name"      => $this->department_name,
                "department_created"   => $this->department_created,
                "department_updated"   => $this->department_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // READ ALL (used for total count in pagination)
    public function readAll()
    {
        try {
            $sql  = " select * ";
            $sql .= " from {$this->tblSettingsDepartment} ";
            $sql .= " where true ";
            $sql .= $this->department_is_active !== null && $this->department_is_active !== ""
                ? " and department_is_active = :department_is_active "
                : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? " department_name like :department_name " : " ";
            $sql .= $this->search != "" ? " ) " : " ";
            $sql .= " order by department_aid desc ";

            $query = $this->connection->prepare($sql);

            if ($this->department_is_active !== null && $this->department_is_active !== "") {
                $query->bindValue(":department_is_active", $this->department_is_active);
            }
            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":department_name", $search);
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // READ LIMIT (paginated)
    public function readLimit()
    {
        try {
            $sql  = " select * ";
            $sql .= " from {$this->tblSettingsDepartment} ";
            $sql .= " where true ";
            $sql .= $this->department_is_active !== null && $this->department_is_active !== ""
                ? " and department_is_active = :department_is_active "
                : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? " department_name like :department_name " : " ";
            $sql .= $this->search != "" ? " ) " : " ";
            $sql .= " order by department_aid desc ";
            $sql .= " limit :start, :total ";

            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", (int) $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", (int) $this->total, PDO::PARAM_INT);

            if ($this->department_is_active !== null && $this->department_is_active !== "") {
                $query->bindValue(":department_is_active", $this->department_is_active);
            }
            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":department_name", $search);
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // READ ALL ACTIVE (for employee dropdown)
    public function readAllActive()
    {
        try {
            $sql  = " select * ";
            $sql .= " from {$this->tblSettingsDepartment} ";
            $sql .= " where department_is_active = 1 ";
            $sql .= " order by department_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // UPDATE
    public function update()
    {
        try {
            $sql  = "update {$this->tblSettingsDepartment} set ";
            $sql .= "department_name    = :department_name, ";
            $sql .= "department_updated = :department_updated ";
            $sql .= "where department_aid = :department_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name"    => $this->department_name,
                "department_updated" => $this->department_updated,
                "department_aid"     => $this->department_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    // ACTIVE / ARCHIVE / RESTORE
    public function active()
    {
        try {
            $sql  = "update {$this->tblSettingsDepartment} set ";
            $sql .= "department_is_active = :department_is_active, ";
            $sql .= "department_updated   = :department_updated ";
            $sql .= "where department_aid = :department_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active" => $this->department_is_active,
                "department_updated"   => $this->department_updated,
                "department_aid"       => $this->department_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    // DELETE
    public function delete()
    {
        try {
            $sql  = "delete from {$this->tblSettingsDepartment} ";
            $sql .= "where department_aid = :department_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_aid" => $this->department_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    // CHECK NAME (for duplicate validation)
    public function checkName()
    {
        try {
            $sql  = " select department_name ";
            $sql .= " from {$this->tblSettingsDepartment} ";
            $sql .= " where department_name = :department_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => $this->department_name,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}