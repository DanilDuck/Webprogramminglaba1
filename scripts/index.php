<?php
session_start();
if (!isset($_SESSION['data']))
    $_SESSION['data'] = array();


$x = @$_POST["x_coordinate"];
$y = @$_POST["y_coordinate"];
$r = @$_POST["r_coordinate"];
$timezone= @$_POST["timezone"];

function check_first_area($x, $y, $r){
    return ($x>=0 && $y>=0 && sqrt($x*$x+$y*$y)<=$r/2);
}

function check_second_area($x, $y, $r){
    return ($x<=0 && $y>=0 && $x<=2*$y-$r);
}

function check_third_area($x, $y, $r){
    return ($x>=0 && $y<=0 && $x<=$r && $y>=$r);
}
$is_inside = check_first_area($x, $y, $r) || check_second_area($x, $y, $r) || check_third_area($x, $y, $r);
$hit_fact = $is_inside ? "Hit": "Miss";
$current_time = date("j M o G:i:s", time()-$timezone*60);
$execution_time = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

$answer = array("x"=>$x, "y"=>$y, "r"=>$r, "hit_fact"=>$hit_fact, "current_time"=>$current_time, "execution_time"=>$execution_time);
array_push($_SESSION['data'], $answer);


foreach ($_SESSION['data'] as $elem){
    echo "<tr class='columns'>";
    echo "<td>" . $elem['x'] . "</td>";
    echo "<td>" . $elem['y'] . "</td>";
    echo "<td>" . $elem['r'] . "</td>";
    echo "<td>" . $elem['hit_fact']  . "</td>";
    echo "<td>" . $elem['current_time']  . "</td>";
    echo "<td>" . $elem['execution_time'] . "</td>";
    echo "</tr>";
}

?>
