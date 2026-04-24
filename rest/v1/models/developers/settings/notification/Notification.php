<?php

class Notification
{
    public $notification_aid;
    public $notification_is_active;
    public $notification_first_name;
    public $notification_last_name;
    public $notification_purpose;
    public $notification_email;
    public $notification_created;
    public $notification_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblSettingsNotification;

    public function __construct($db)
    {
        $this->connection              = $db;
        $this->tblSettingsNotification = "settings_notification";
    }

    // CREATE
    public function create()
    {
        try {
            $sql  = "insert into {$this->tblSettingsNotification} ";
            $sql .= "(";
            $sql .= " notification_is_active,";
            $sql .= " notification_first_name,";
            $sql .= " notification_last_name,";
            $sql .= " notification_purpose,";
            $sql .= " notification_email,";
            $sql .= " notification_created,";
            $sql .= " notification_updated";
            $sql .= ") values (";
            $sql .= " :notification_is_active,";
            $sql .= " :notification_first_name,";
            $sql .= " :notification_last_name,";
            $sql .= " :notification_purpose,";
            $sql .= " :notification_email,";
            $sql .= " :notification_created,";
            $sql .= " :notification_updated";
            $sql .= ")";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active"  => $this->notification_is_active,
                "notification_first_name" => $this->notification_first_name,
                "notification_last_name"  => $this->notification_last_name,
                "notification_purpose"    => $this->notification_purpose,
                "notification_email"      => $this->notification_email,
                "notification_created"    => $this->notification_created,
                "notification_updated"    => $this->notification_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // READ ALL — used for total count in pagination
    public function readAll()
    {
        try {
            $sql  = " select * ";
            $sql .= " from {$this->tblSettingsNotification} ";
            $sql .= " where true ";
            $sql .= $this->notification_is_active !== null && $this->notification_is_active !== ""
                ? " and notification_is_active = :notification_is_active "
                : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? " notification_first_name like :notification_first_name " : " ";
            $sql .= $this->search != "" ? " or notification_last_name like :notification_last_name " : " ";
            $sql .= $this->search != "" ? " or notification_purpose like :notification_purpose " : " ";
            $sql .= $this->search != "" ? " or notification_email like :notification_email " : " ";
            $sql .= $this->search != "" ? " ) " : " ";
            $sql .= " order by notification_aid desc ";

            $query = $this->connection->prepare($sql);

            if ($this->notification_is_active !== null && $this->notification_is_active !== "") {
                $query->bindValue(":notification_is_active", $this->notification_is_active);
            }
            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":notification_first_name", $search);
                $query->bindValue(":notification_last_name",  $search);
                $query->bindValue(":notification_purpose",    $search);
                $query->bindValue(":notification_email",      $search);
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // READ LIMIT — paginated
    public function readLimit()
    {
        try {
            $sql  = " select * ";
            $sql .= " from {$this->tblSettingsNotification} ";
            $sql .= " where true ";
            $sql .= $this->notification_is_active !== null && $this->notification_is_active !== ""
                ? " and notification_is_active = :notification_is_active "
                : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? " notification_first_name like :notification_first_name " : " ";
            $sql .= $this->search != "" ? " or notification_last_name like :notification_last_name " : " ";
            $sql .= $this->search != "" ? " or notification_purpose like :notification_purpose " : " ";
            $sql .= $this->search != "" ? " or notification_email like :notification_email " : " ";
            $sql .= $this->search != "" ? " ) " : " ";
            $sql .= " order by notification_aid desc ";
            $sql .= " limit :start, :total ";

            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", (int) $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", (int) $this->total,     PDO::PARAM_INT);

            if ($this->notification_is_active !== null && $this->notification_is_active !== "") {
                $query->bindValue(":notification_is_active", $this->notification_is_active);
            }
            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":notification_first_name", $search);
                $query->bindValue(":notification_last_name",  $search);
                $query->bindValue(":notification_purpose",    $search);
                $query->bindValue(":notification_email",      $search);
            }

            $query->execute();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // UPDATE
    public function update()
    {
        try {
            $sql  = "update {$this->tblSettingsNotification} set ";
            $sql .= "notification_first_name = :notification_first_name, ";
            $sql .= "notification_last_name  = :notification_last_name, ";
            $sql .= "notification_purpose     = :notification_purpose, ";
            $sql .= "notification_email       = :notification_email, ";
            $sql .= "notification_updated     = :notification_updated ";
            $sql .= "where notification_aid   = :notification_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_first_name" => $this->notification_first_name,
                "notification_last_name"  => $this->notification_last_name,
                "notification_purpose"    => $this->notification_purpose,
                "notification_email"      => $this->notification_email,
                "notification_updated"    => $this->notification_updated,
                "notification_aid"        => $this->notification_aid,
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
            $sql  = "update {$this->tblSettingsNotification} set ";
            $sql .= "notification_is_active = :notification_is_active, ";
            $sql .= "notification_updated   = :notification_updated ";
            $sql .= "where notification_aid  = :notification_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_updated"   => $this->notification_updated,
                "notification_aid"       => $this->notification_aid,
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
            $sql  = "delete from {$this->tblSettingsNotification} ";
            $sql .= "where notification_aid = :notification_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    // CHECK EMAIL — duplicate validation
    public function checkEmail()
    {
        try {
            $sql  = " select notification_email ";
            $sql .= " from {$this->tblSettingsNotification} ";
            $sql .= " where notification_email = :notification_email ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_email" => $this->notification_email,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}
