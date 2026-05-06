<?php

class Memo
{
    public $memo_aid;
    public $memo_is_active;
    public $memo_from;
    public $memo_to;
    public $memo_date;
    public $memo_category;
    public $memo_text;
    public $memo_created;
    public $memo_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblMemo;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblMemo = "memo";
    }

    // CREATE
    public function create()
    {
        try {
            $sql = "insert into {$this->tblMemo} ";
            $sql .= " ( ";
            $sql .= " memo_is_active, ";
            $sql .= " memo_from, ";
            $sql .= " memo_to, ";
            $sql .= " memo_date, ";
            $sql .= " memo_category, ";
            $sql .= " memo_text, ";
            $sql .= " memo_created, ";
            $sql .= " memo_updated ";
            $sql .= " ) values (";
            $sql .= " :memo_is_active, ";
            $sql .= " :memo_from, ";
            $sql .= " :memo_to, ";
            $sql .= " :memo_date, ";
            $sql .= " :memo_category, ";
            $sql .= " :memo_text, ";
            $sql .= " :memo_created, ";
            $sql .= " :memo_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_is_active" => $this->memo_is_active,
                "memo_from" => $this->memo_from,
                "memo_to" => $this->memo_to,
                "memo_date" => $this->memo_date,
                "memo_category" => $this->memo_category,
                "memo_text" => $this->memo_text,
                "memo_created" => $this->memo_created,
                "memo_updated" => $this->memo_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // READ ALL (for total count)
    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "memo_aid ";
            $sql .= " from {$this->tblMemo} ";
            $sql .= " where true ";
            $sql .= $this->memo_is_active !== null && $this->memo_is_active !== "" ? " and memo_is_active = :memo_is_active " : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? "memo_from like :memo_from " : " ";
            $sql .= $this->search != "" ? "or memo_to like :memo_to " : " ";
            $sql .= $this->search != "" ? "or memo_category like :memo_category " : " ";
            $sql .= $this->search != "" ? "or memo_text like :memo_text " : " ";
            $sql .= $this->search != "" ? " )" : " ";
            $sql .= " order by memo_aid desc ";
            $query = $this->connection->prepare($sql);

            if ($this->memo_is_active !== null && $this->memo_is_active !== "") {
                $query->bindValue(":memo_is_active", $this->memo_is_active);
            }

            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":memo_from", $search);
                $query->bindValue(":memo_to", $search);
                $query->bindValue(":memo_category", $search);
                $query->bindValue(":memo_text", $search);
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
            $sql = "select ";
            $sql .= "memo_aid, ";
            $sql .= "memo_is_active, ";
            $sql .= "memo_from, ";
            $sql .= "memo_to, ";
            $sql .= "memo_date, ";
            $sql .= "memo_category, ";
            $sql .= "memo_text, ";
            $sql .= "memo_created, ";
            $sql .= "memo_updated ";
            $sql .= " from {$this->tblMemo} ";
            $sql .= " where true ";
            $sql .= $this->memo_is_active !== null && $this->memo_is_active !== "" ? " and memo_is_active = :memo_is_active " : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? "memo_from like :memo_from " : " ";
            $sql .= $this->search != "" ? "or memo_to like :memo_to " : " ";
            $sql .= $this->search != "" ? "or memo_category like :memo_category " : " ";
            $sql .= $this->search != "" ? "or memo_text like :memo_text " : " ";
            $sql .= $this->search != "" ? " )" : " ";
            $sql .= " order by memo_aid desc ";
            $sql .= " limit :start, ";
            $sql .= " :total ";
            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", (int) $this->start - 1, PDO::PARAM_INT);
            $query->bindValue(":total", (int) $this->total, PDO::PARAM_INT);

            if ($this->memo_is_active !== null && $this->memo_is_active !== "") {
                $query->bindValue(":memo_is_active", $this->memo_is_active);
            }

            if ($this->search != "") {
                $search = "%{$this->search}%";
                $query->bindValue(":memo_from", $search);
                $query->bindValue(":memo_to", $search);
                $query->bindValue(":memo_category", $search);
                $query->bindValue(":memo_text", $search);
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
            $sql = "update {$this->tblMemo} set ";
            $sql .= "memo_from = :memo_from, ";
            $sql .= "memo_to = :memo_to, ";
            $sql .= "memo_date = :memo_date, ";
            $sql .= "memo_category = :memo_category, ";
            $sql .= "memo_text = :memo_text, ";
            $sql .= "memo_updated = :memo_updated ";
            $sql .= "where memo_aid = :memo_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_from" => $this->memo_from,
                "memo_to" => $this->memo_to,
                "memo_date" => $this->memo_date,
                "memo_category" => $this->memo_category,
                "memo_text" => $this->memo_text,
                "memo_updated" => $this->memo_updated,
                "memo_aid" => $this->memo_aid,
            ]);
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }
        return $query;
    }

    // ARCHIVE / RESTORE (toggle is_active)
    public function active()
    {
        try {
            $sql = "update {$this->tblMemo} set ";
            $sql .= "memo_is_active = :memo_is_active, ";
            $sql .= "memo_updated = :memo_updated ";
            $sql .= "where memo_aid = :memo_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_is_active" => $this->memo_is_active,
                "memo_updated" => $this->memo_updated,
                "memo_aid" => $this->memo_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    // DELETE
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblMemo} ";
            $sql .= "where memo_aid = :memo_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_aid" => $this->memo_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }
}